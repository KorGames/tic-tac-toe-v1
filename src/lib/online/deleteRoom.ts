import firebase from "firebase";

const deleteRoom = async (id: string) => {
  return await firebase.firestore().collection("rooms").doc(id).delete();
};

export default deleteRoom;
