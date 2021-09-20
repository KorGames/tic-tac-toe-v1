import firebase from "firebase";
import deleteRoom from "./deleteRoom";

const exitRoom = async (roomId: string, user: string) => {
  try {
    const roomRef = firebase.firestore().collection("rooms").doc(roomId);
    const roomSnap = await roomRef.get();
    const roomData = roomSnap.data();
    if (roomData) {
      const side = roomData.players["X"] === user ? "X" : "O";
      if (roomData.players[side === "X" ? "O" : "X"] === null) {
        // Remove room if last player quiting
        await deleteRoom(roomData.id);
      } else {
        roomRef.update({
          [`players.${side}`]: null,
        });
      }
    } else {
      console.log("No Room");
    }
  } catch (error) {
    console.log("exitRoom", error);
  }
};

export default exitRoom;
