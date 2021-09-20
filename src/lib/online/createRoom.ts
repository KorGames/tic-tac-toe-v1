import firebase from "firebase";

const createRoom = async (userId: string) => {
  const ref = await firebase
    .firestore()
    .collection("rooms")
    .add({
      board: [null, null, null, null, null, null, null, null, null],

      turn: "O",
      players: { X: userId, O: null },
      winner: null,
    });
  await ref.update({
    id: ref.id,
  });

  return ref.id;
};

export default createRoom;
