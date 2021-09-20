import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Icon, Pressable, Spinner } from "native-base";
import { useAppDispatch, useAppSelector } from "store/store";
import { cellSet } from "store/slices/gameSlice";
import firebase from "firebase";
import { makeMove, switchTurn } from "lib/online";

interface Props {
  id: number;
}

const Cell: React.FC<Props> = (props) => {
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
      return (
        <Icon as={FontAwesome} name="close" size="3xl" color="primary.500" />
      );
    } else if (value === "O") {
      return (
        <Icon
          as={FontAwesome}
          name="circle-o"
          size="2xl"
          color="secondary.500"
        />
      );
    } else {
      return null;
    }
  };

  if (!room) {
    return (
      <Pressable
        flex={1}
        onPress={handlePress}
        borderRadius={10}
        backgroundColor="tertiary.700"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Pressable>
    );
  }

  return (
    <Pressable
      flex={1}
      onPress={handlePress}
      borderRadius={10}
      backgroundColor="tertiary.700"
      justifyContent="center"
      alignItems="center"
    >
      {getIcon(room.board[id])}
    </Pressable>
  );
};

export default Cell;
