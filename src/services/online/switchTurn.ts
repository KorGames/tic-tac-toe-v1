import { doc, updateDoc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const switchTurn = async (room: any) => {
  const doc_ref = doc(firebase_firestore, "rooms", room.id);
  updateDoc(doc_ref, {
    turn: room.turn === "X" ? "O" : "X",
  });
};

export default switchTurn;
