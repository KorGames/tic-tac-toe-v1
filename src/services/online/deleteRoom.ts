import { deleteDoc, doc } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const deleteRoom = async (id: string) => {
  return await deleteDoc(doc(firebase_firestore, "rooms", id));
};

export default deleteRoom;
