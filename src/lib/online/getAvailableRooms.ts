import firebase from "firebase";

const getAvailableRooms = async () => {
  const xdata = await firebase
    .firestore()
    .collection("rooms")
    .where("players.X", "==", null)
    .where("winner", "==", null)
    .get();
  if (xdata.size > 0) {
    console.log(xdata.docs.map((doc) => doc.data()));
    return { side: "X", id: xdata.docs[0].id };
  }
  const odata = await firebase
    .firestore()
    .collection("rooms")
    .where("players.O", "==", null)
    .where("winner", "==", null)
    .get();
  if (odata.size > 0) {
    return { side: "O", id: odata.docs[0].id };
  }
  return false;
};

export default getAvailableRooms;
