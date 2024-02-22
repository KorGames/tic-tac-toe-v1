import firebase_firestore from "@react-native-firebase/firestore";
import firebase_auth from "@react-native-firebase/auth";

import { IRoom } from "types/room.types";
import { board_service } from "./board.service";

const rooms_collection = firebase_firestore().collection("rooms");

const on_room_change = (room_id: string, callback: (room: IRoom) => void) => {
  const unsubscribe = rooms_collection.doc(room_id).onSnapshot((doc) => {
    if (doc.exists) callback(doc.data() as IRoom);
    else unsubscribe();
  });
  return unsubscribe;
};

const get_available_room = async () => {
  const docs = await rooms_collection
    .where(<keyof IRoom>"x_player_id", "==", null)
    .where(<keyof IRoom>"o_player_id", "==", null)
    .limit(1)
    .get();

  if (docs.empty) return null;
  return docs.docs[0].data() as IRoom;
};

const create_room = async () => {
  const user_id = firebase_auth().currentUser?.uid;
  if (!user_id) throw new Error("User not logged in");

  const room_ref = rooms_collection.doc();

  const room_payload: IRoom = {
    id: room_ref.id,
    board: board_service.initial_board,
    turn: "X",
    x_player_id: user_id,
    x_player_wins: 0,
    x_player_left: false,
    o_player_id: null,
    o_player_wins: 0,
    o_player_left: false,
    draws: 0,
    last_move_cell: null,
    created_by: user_id,
    created_date: new Date().toISOString(),
  };
  room_ref.set(room_payload);
  return room_ref.id;
};

const exit_room = async (room_id: string) => {
  const user = firebase_auth().currentUser?.uid;
  if (!user) throw new Error("User not logged in");

  const room_ref = rooms_collection.doc(room_id);
  const room_data = (await room_ref.get()).data() as IRoom;
  if (!room_data) throw new Error("Room not found");

  const payload: Partial<IRoom> = {};
  if (room_data.x_player_id === user) payload.x_player_left = true;
  else if (room_data.o_player_id === user) payload.o_player_left = true;
  else throw new Error("User not in room");
  await room_ref.update(payload);
};

const join_room = async (room_id: string) => {
  const user = firebase_auth().currentUser?.uid;
  if (!user) throw new Error("User not logged in");

  const room_ref = rooms_collection.doc(room_id);
  const room_data = (await room_ref.get()).data() as IRoom;
  if (!room_data) throw new Error("Room not found");

  const side = room_data.x_player_id === null ? "X" : room_data.o_player_id === null ? "O" : null;
  if (!side) throw new Error("Room full");

  const payload: Partial<IRoom> = {};
  if (side === "X") payload.x_player_id = user;
  else payload.o_player_id = user;
  await room_ref.update(payload);
};

const make_move = async (room_id: string, cell: number, user_id?: string) => {
  if (!user_id) user_id = firebase_auth().currentUser?.uid;
  if (!user_id) throw new Error("User not logged in");

  const room_ref = rooms_collection.doc(room_id);
  const room_data = (await room_ref.get()).data() as IRoom;

  if (!room_data) throw new Error("Room not found");
  if (room_data.board[cell] !== null) throw new Error("Cell already occupied");
  if (room_data.turn === "X" && room_data.x_player_id !== user_id) throw new Error("Not your turn");
  if (room_data.turn === "O" && room_data.o_player_id !== user_id) throw new Error("Not your turn");

  const payload: Partial<IRoom> = {
    last_move_cell: cell,
  };
  const board = [...room_data.board];
  board[cell] = room_data.turn;
  payload.board = board;

  const winner = board_service.calculate_winner(board);
  if (winner) {
    if (winner === "X") payload.x_player_wins = room_data.x_player_wins + 1;
    else if (winner === "O") payload.o_player_wins = room_data.o_player_wins + 1;
    else payload.draws = room_data.draws + 1;
    payload.board = board_service.initial_board;
    payload.last_move_cell = null;
  }

  payload.turn = room_data.turn === "X" ? "O" : "X";
  await room_ref.update(payload);
};

const find_room = async () => {
  const room = await get_available_room();
  if (room) {
    await join_room(room.id);
    return room.id;
  }
  return await create_room();
};

const ai_join_room = async (room_id: string) => {
  const room_ref = rooms_collection.doc(room_id);
  const room_data = (await room_ref.get()).data() as IRoom;
  if (!room_data) throw new Error("Room not found");

  const side = room_data.x_player_id === null ? "X" : room_data.o_player_id === null ? "O" : null;
  if (!side) throw new Error("Room full");

  const payload: Partial<IRoom> = {};
  if (side === "X") payload.x_player_id = "AI";
  else payload.o_player_id = "AI";
  await room_ref.update(payload);
};

export const room_service = { find_room, make_move, exit_room, on_room_change, ai_join_room };
