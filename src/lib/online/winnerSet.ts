import firebase from "firebase";

const winnerSet = async (id: string, winner: "X" | "O" | "draw") => {
  await firebase.firestore().collection("rooms").doc(id).update({
    winner,
  });
  return true;
};

export default winnerSet;
