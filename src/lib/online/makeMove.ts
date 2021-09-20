import firebase from "firebase";

const makeMove = async (id: string, index: number, side: "X" | "O") => {
  console.log("makeMove ", id, index, side);
  try {
    const data = (
      await firebase.firestore().collection("rooms").doc(id).get()
    ).data();
    if (data) {
      let localBoard = data.board;
      localBoard[index] = side;
      await firebase.firestore().collection("rooms").doc(id).update({
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
