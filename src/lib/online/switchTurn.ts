import firebase from "firebase";

const switchTurn = async (room: any) => {
  await firebase
    .firestore()
    .collection("rooms")
    .doc(room.id)
    .update({
      turn: room.turn === "X" ? "O" : "X",
    });
};

export default switchTurn;
