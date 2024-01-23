import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const makeMove = async (id: string, index: number, side: "X" | "O") => {
  try {
    const doc_ref = doc(firebase_firestore, "rooms", id);
    const doc_snap = await getDoc(doc_ref);
    const data = doc_snap.data();
    if (data) {
      let localBoard = data.board;
      localBoard[index] = side;
      updateDoc(doc_ref, {
        board: localBoard,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export default makeMove;
