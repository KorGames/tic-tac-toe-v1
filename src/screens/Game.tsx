import { Layout } from "components/common";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { GameBoard, ResultModal, XOSwitch } from "components/game";
import { BoardProp } from "utils/interfaces";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { getHardMove } from "lib/ai/hard";
import { checkWin } from "lib/board";
import { useAppDispatch, useAppSelector } from "store/store";
import {
  winnerSet,
  cellSet,
  turnSet,
  boardReset,
  resultReset,
} from "store/slices/gameSlice";
import { showResultModal } from "store/slices/modalSlice";

const Game = () => {
  const nav = useNavigation();

  const { board, turn, result, winner } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const isBoardFull = board.every((cell) => cell);
  const isBoardEmpty = board.every((cell) => !cell);
  const route = useRoute();
  const isAi = route.params && (route.params as any).ai;
  // Switch turn
  useEffect(() => {
    if (!isBoardEmpty) {
      dispatch(turnSet(turn === "O" ? "X" : "O"));
    }
  }, [board]);

  // Check terminal state
  useEffect(() => {
    if (isBoardFull) {
      dispatch(winnerSet("draw"));
    }
    const win = checkWin(board);
    if (win) {
      dispatch(winnerSet(win));
    }
  }, [board]);

  const handleAi = () => {
    // Find available moves
    let availableMoves: number[] = [];
    board.forEach((item, index) => {
      if (!item) {
        availableMoves = [...availableMoves, index];
      }
    });

    if (winner) {
      return;
    }

    if (availableMoves && turn === "X") {
      if (availableMoves.length > 7) {
        dispatch(
          cellSet({
            id: availableMoves[
              Math.floor(Math.random() * availableMoves.length)
            ]!,
            data: "X",
          })
        );
      } else {
        const aiMove = getHardMove(board, "X");
        // console.log(aiMove);
        dispatch(cellSet({ id: aiMove!, data: "X" }));
      }
    }
  };

  // Ai activated
  useEffect(() => {
    if (isAi) {
      handleAi();
    }
  }, [turn]);

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      dispatch(showResultModal(true));
    }
  }, [result]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resultReset());
        dispatch(boardReset());
      };
    }, [])
  );

  return (
    <Layout>
      <ResultModal />
      <VStack flex={1} padding={5}>
        <HStack justifyContent="space-evenly">
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="close" color="primary.500" />
            <Text color="primary.500" bold>
              {result.xWins} Wins
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="balance-scale" color="light.500" />
            <Text color="light.500" bold>
              {result.draws} Draws
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="circle-o" color="secondary.500" />
            <Text color="secondary.500" bold>
              {result.oWins} Wins
            </Text>
          </VStack>
        </HStack>
        <Box flex={1} paddingY={5}>
          <GameBoard />
        </Box>
        <HStack justifyContent="space-evenly" alignItems="center">
          <IconButton
            variant="solid"
            borderRadius={50}
            padding={5}
            icon={<Icon as={FontAwesome} name="home" />}
            onPress={() => nav.navigate("Home" as any)}
          />

          <IconButton
            variant="solid"
            borderRadius={50}
            padding={5}
            icon={
              <Icon
                as={FontAwesome}
                name={turn === "O" ? "circle-o" : "close"}
              />
            }
            onPress={() => nav.navigate("Home" as any)}
          />

          <IconButton
            variant="solid"
            borderRadius={50}
            padding={5}
            icon={<Icon as={FontAwesome} name="refresh" />}
            onPress={() => dispatch(boardReset())}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Game;
