import { collection, getDocs, query, where } from "firebase/firestore";
import { firebase_firestore } from "utils/firebase";

const getAvailableRooms = async () => {
  const collection_ref = collection(firebase_firestore, "rooms");
  const x_data_query = query(collection_ref, where("players.X", "==", null), where("winner", "==", null));
  const x_data = await getDocs(x_data_query);

  if (x_data.size > 0) {
    console.log(x_data.docs.map((doc) => doc.data()));
    return { side: "X", id: x_data.docs[0].id };
  }

  const o_data_query = query(collection_ref, where("players.O", "==", null), where("winner", "==", null));
  const o_data = await getDocs(o_data_query);
  if (o_data.size > 0) {
    return { side: "O", id: o_data.docs[0].id };
  }
  return false;
};

export default getAvailableRooms;
