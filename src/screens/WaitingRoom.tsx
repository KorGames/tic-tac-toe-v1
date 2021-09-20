import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Layout } from "components/common";
import {
  createRoom,
  deleteRoom,
  getAvailableRooms,
  getRoom,
  joinRoom,
} from "lib/online";
import { Button, Heading, HStack, Icon, Spinner, VStack } from "native-base";
import React, { useState, useEffect, useCallback } from "react";
import { roomSet, userSet } from "store/slices/onlineSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import exitRoom from "lib/online/exitRoom";

const WaitingRoom = () => {
  const [timer, setTimer] = useState(0);
  const dispatch = useAppDispatch();
  const { user, room } = useAppSelector((state) => state.online);

  const side = room && (room.players["X"] === user ? "X" : "O");
  const nav = useNavigation();

  const flow = async () => {
    // Check available rooms
    console.log("Check available rooms");
    const roomAvaialable = await getAvailableRooms();
    console.log(roomAvaialable);
    if (roomAvaialable) {
      // If available join
      console.log("If available join");
      await joinRoom(
        roomAvaialable.id,
        user!,
        roomAvaialable.side as "X" | "O"
      );
      const roomData = await getRoom(roomAvaialable.id);
      dispatch(roomSet(roomData));
    } else {
      // If no room than create
      console.log("If no room than create");
      const id = await createRoom(user!);
      const roomData = await getRoom(id);
      dispatch(roomSet(roomData));
    }
  };
  useFocusEffect(
    useCallback(() => {
      // Set user
      if (!user) {
        console.log("Set user");
        const uid = uuidv4();
        dispatch(userSet(uid));
      }
      // Check for room
      if (user && !room) {
        console.log("Flow");
        flow();
      }
    }, [user, room])
  );

  useFocusEffect(
    useCallback(() => {
      // Real time updates of the room

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

  useFocusEffect(
    useCallback(() => {
      if (room) {
        // If room full go to game
        console.log("Room players", room.players);
        if (room.players["X"] && room.players["O"]) {
          nav.navigate("OnlineGame");
        }
      }
    }, [room])
  );

  const handleClose = async () => {
    if (room && user) {
      await exitRoom(room.id, user);
      dispatch(roomSet(null));
    }
    nav.navigate("Home");
  };

  useFocusEffect(
    useCallback(() => {
      const interVal = setInterval(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);

      const timeOut = setTimeout(async () => {
        await exitRoom(room?.id!, user!);
        dispatch(roomSet(null));
        nav.navigate("Game", { ai: true });
      }, 10 * 1000);
      return () => {
        clearTimeout(timeOut);
        clearInterval(interVal);
      };
    }, [])
  );

  return (
    <Layout>
      <VStack flex={1} justifyContent="space-evenly">
        <VStack
          backgroundColor="primary.500"
          width={150}
          height={150}
          justifyContent="space-evenly"
          alignItems="center"
          borderRadius={20}
          padding={5}
          alignSelf="center"
        >
          <Icon as={FontAwesome5} name="user-astronaut" size="xl" />
          <Heading color="white">You</Heading>
        </VStack>
        <HStack justifyContent="space-evenly">
          <Heading>{timer}</Heading>
          <Button
            startIcon={<Icon as={FontAwesome5} name="arrow-left" />}
            onPress={handleClose}
          >
            Close
          </Button>
        </HStack>
        <VStack
          backgroundColor="secondary.500"
          width={150}
          height={150}
          justifyContent="space-evenly"
          alignItems="center"
          borderRadius={20}
          padding={5}
          alignSelf="center"
        >
          {room && room.players[side === "X" ? "O" : "X"] ? (
            <Icon as={FontAwesome5} name="user-secret" size="xl" />
          ) : (
            <Spinner />
          )}
          <Heading color="white" numberOfLines={1} adjustsFontSizeToFit>
            Opponent
          </Heading>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default WaitingRoom;
