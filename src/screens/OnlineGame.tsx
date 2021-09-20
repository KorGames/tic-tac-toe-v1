import { Layout } from "components/common";
import React, { useEffect, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Board, ResultModal } from "components/online";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  VStack,
} from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { checkWin } from "lib/board";
import { useAppDispatch, useAppSelector } from "store/store";

import { showResultModal } from "store/slices/modalSlice";
import { exitRoom, winnerSet } from "lib/online";
import firebase from "firebase";
import { roomSet } from "store/slices/onlineSlice";
import { FontAwesome5 } from "@expo/vector-icons";

const OnlineGame = () => {
  const nav = useNavigation();
  const { room, user } = useAppSelector((state) => state.online);
  const dispatch = useAppDispatch();

  const isBoardFull = room && room.board.every((cell) => cell);

  useEffect(() => {
    // Check terminal state
    if (room) {
      if (!room.winner) {
        if (isBoardFull) {
          winnerSet(room.id, "draw");
          dispatch(showResultModal(true));
        }
        const win = checkWin(room.board);
        if (win) {
          winnerSet(room.id, win);
          dispatch(showResultModal(true));
        }
      }
    }
  }, [room]);

  useFocusEffect(
    useCallback(() => {
      let unsub = () => {};
      // Track real time updates of the room
      if (room) {
        unsub = firebase
          .firestore()
          .collection("rooms")
          .doc(room.id)
          .onSnapshot((snap) => {
            console.log("Update");
            const data = snap.data();
            dispatch(roomSet(data));
          });
      }
      return () => unsub();
    }, [room?.id])
  );

  const handleClose = async () => {
    if (user && room) {
      await exitRoom(room?.id, user);
      dispatch(roomSet(null));
      dispatch(showResultModal(false));
    }
    nav.navigate("Home");
  };

  if (!room) {
    return (
      <Layout>
        <Center>
          <Spinner />
          <Button onPress={() => nav.navigate("Home")}>Close</Button>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <ResultModal />
      <VStack flex={1} padding={5}>
        <Box flex={1} paddingY={5}>
          <Board />
        </Box>
        <HStack justifyContent="space-evenly" alignItems="center">
          <VStack
            backgroundColor={room.players["X"] ? "secondary.500" : "gray.500"}
            justifyContent="space-evenly"
            alignItems="center"
            borderRadius={20}
            padding={5}
            borderWidth={2}
            borderColor={room.turn === "X" ? "white" : "secondary.500"}
          >
            {room.players["X"] ? (
              <Icon as={FontAwesome} name="close" />
            ) : (
              <Icon as={FontAwesome} name="exclamation-circle" />
            )}
            <Heading color="white">
              {room.players.X === user ? "You" : "Opp"}
            </Heading>
          </VStack>
          <IconButton
            icon={<Icon as={FontAwesome5} name="home" />}
            variant="solid"
            p={5}
            borderRadius={20}
            onPress={handleClose}
          />

          <VStack
            backgroundColor={room.players["O"] ? "primary.500" : "gray.500"}
            justifyContent="space-evenly"
            alignItems="center"
            borderRadius={20}
            padding={5}
            borderWidth={2}
            borderColor={room.turn === "O" ? "white" : "primary.500"}
          >
            {room.players["O"] ? (
              <Icon as={FontAwesome} name="circle-o" />
            ) : (
              <Icon as={FontAwesome} name="exclamation-circle" />
            )}
            <Heading color="white">
              {room.players.O === user ? "You" : "Opp"}
            </Heading>
          </VStack>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default OnlineGame;
