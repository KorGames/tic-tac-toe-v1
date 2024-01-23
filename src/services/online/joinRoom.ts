import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const joinRoom = async (id: string, user: string, side: "X" | "O") => {
  const room_ref = doc(firebase_firestore, "rooms", id);
  await updateDoc(room_ref, {
    [`players.${side}`]: user,
  });
  return true;
};

export default joinRoom;
