import { doc, getDoc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const getRoom = async (id: string) => {
  const doc_ref = doc(firebase_firestore, "rooms", id);
  const doc_snap = await getDoc(doc_ref);
  return doc_snap.data();
};

export default getRoom;
