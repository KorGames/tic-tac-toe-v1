import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "store/store";
import { cellSet } from "store/slices/gameSlice";
import firebase from "firebase";
import { makeMove, switchTurn } from "lib/online";
import { Pressable } from "react-native";

interface Props {
  id: number;
}

export const Cell: React.FC<Props> = (props) => {
  const { id } = props;
  const { room, user } = useAppSelector((state) => state.online);

  const handlePress = async () => {
    // If cell is not available or game has ended
    if (!room || !user) {
      console.log("No room or user from cell");
      return;
    }
    if (room.board[id]) {
      console.log("Cell is not available");
      return;
    }

    // If not user turn
    if (room.players[room.turn] !== user) {
      return;
    }

    await makeMove(room.id, id, room.turn);
    await switchTurn(room);
  };

  const getIcon = (value: null | "X" | "O") => {
    if (value === "X") {
      return <FontAwesome name="close" />;
    } else if (value === "O") {
      return <FontAwesome name="circle-o" />;
    } else {
      return null;
    }
  };

  if (!room) {
    return (
      <Pressable
        onPress={handlePress}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <Spinner /> */}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {getIcon(room.board[id])}
    </Pressable>
  );
};
