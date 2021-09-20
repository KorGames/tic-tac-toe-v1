import firebase from "firebase";

const joinRoom = async (id: string, user: string, side: "X" | "O") => {
  await firebase
    .firestore()
    .collection("rooms")
    .doc(id)
    .update({
      [`players.${side}`]: user,
    });
  return true;
};

export default joinRoom;
