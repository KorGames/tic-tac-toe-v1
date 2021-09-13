import { Layout } from "components/common";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { GameBoard, ResultModal, XOSwitch } from "components/game";
import { BoardProp } from "utils/interfaces";
import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/core";

const Game = () => {

  const nav = useNavigation()

  const [oWins, setOWins] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const [firstTurn, setFirstTurn] = useState<"X" | "O">("X");

  const [board, setBoard] = useState<BoardProp>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  });
  const isBoardFull = !Object.values(board).some((x) => x === null);
  const isBoardEmpty = !Object.values(board).some((x) => x !== null);

  const [turn, setTurn] = useState<"O" | "X">("X");
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState<"O" | "X" | null>(null);

  useEffect(() => {
    if (!isBoardEmpty) {
      setTurn((prevState) => (prevState === "O" ? "X" : "O"));
    }
  }, [board]);

  const clearBoard = () => {
    setBoard({
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
    });
    setTurn(firstTurn);
  };

  const setValueWins = (value: "O" | "X") => {
    if (value === "O") {
      setOWins((prevState) => prevState + 1);
      setWinner("O");
    } else {
      setXWins((prevState) => prevState + 1);
      setWinner("X");
    }
    clearBoard();
  };

  const checkWin = () => {
    if (board[0]) {
      if (board[0] === board[1] && board[1] === board[2]) {
        setValueWins(board[0]);
      } else if (board[0] === board[3] && board[3] === board[6]) {
        setValueWins(board[0]);
      } else if (board[0] === board[4] && board[4] === board[8]) {
        setValueWins(board[0]);
      }
    }

    if (board[1]) {
      if (board[1] === board[4] && board[4] === board[7]) {
        setValueWins(board[1]);
      }
    }

    if (board[2]) {
      if (board[2] === board[4] && board[4] === board[6]) {
        setValueWins(board[2]);
      } else if (board[2] === board[5] && board[5] === board[8]) {
        setValueWins(board[2]);
      }
    }

    if (board[3]) {
      if (board[3] === board[4] && board[4] === board[5]) {
        setValueWins(board[3]);
      }
    }

    if (board[6]) {
      if (board[6] === board[7] && board[7] === board[8]) {
        setValueWins(board[6]);
      }
    }
  };

  const checkDraw = () => {
    if (isBoardFull) {
      setDraws((prevState) => prevState + 1);
      setWinner(null);
      clearBoard();
    }
  };

  useEffect(() => {
    checkDraw();
    checkWin();
  }, [board]);

  useEffect(() => {
    setTurn(firstTurn);
    clearBoard();
  }, [firstTurn]);

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      setShowResult(true);
    }
  }, [winner, oWins, xWins, draws]);

  return (
    <Layout>
      <ResultModal
        visible={showResult}
        hideModal={() => setShowResult(false)}
        winner={winner}
      />
      <VStack flex={1} padding={5}>
        <HStack justifyContent="space-evenly">
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="close" color="primary.500" />
            <Text color="primary.500" bold>
              {xWins} Wins
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="balance-scale" color="light.500" />
            <Text color="light.500" bold>
              {draws} Draws
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Icon as={FontAwesome} name="circle-o" color="secondary.500" />
            <Text color="secondary.500" bold>
              {oWins} Wins
            </Text>
          </VStack>
        </HStack>
        <Box flex={1} paddingY={5}>
          <GameBoard board={board} setBoard={setBoard} turn={turn} />
        </Box>
        <HStack justifyContent="space-evenly" alignItems="center">
          <IconButton
            variant="solid"
            borderRadius={50}
            padding={5}
            icon={<Icon as={FontAwesome} name="home" />}
            onPress={() => nav.navigate('Home')}
          />

          <XOSwitch value={firstTurn} onPress={setFirstTurn} />
          <IconButton
            variant="solid"
            borderRadius={50}
            padding={5}
            icon={<Icon as={FontAwesome} name="refresh" />}
            onPress={clearBoard}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Game;
