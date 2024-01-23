import { doc, updateDoc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const winnerSet = async (id: string, winner: "X" | "O" | "draw") => {
  await updateDoc(doc(firebase_firestore, "rooms", id), {
    winner,
  });
  return true;
};

export default winnerSet;
