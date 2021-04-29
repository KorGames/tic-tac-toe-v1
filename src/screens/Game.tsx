import { Layout } from "components/common";
import React, { useState, useEffect, useRef } from "react";
import { Text, Button } from "react-native-paper";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "style";
import { GameBoard, ResultModal, XOSwitch } from "components/game";
import { BoardProp } from "utils/interfaces";

const Game = () => {
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
      <View style={styles.container}>
        <View style={styles.resultsContainer}>
          <View style={styles.result}>
            <FontAwesome name="close" size={30} color={colors.secondary} />
            <Text style={{ fontWeight: "bold", color: colors.secondary }}>
              {xWins} wins
            </Text>
          </View>
          <View style={styles.result}>
            <FontAwesome name="circle-o" size={30} color={colors.primary} />
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
              {oWins} wins
            </Text>
          </View>
          <View style={styles.result}>
            <FontAwesome
              name="balance-scale"
              size={30}
              color={colors.tertiary}
            />
            <Text style={{ fontWeight: "bold", color: colors.tertiary }}>
              {draws} draws
            </Text>
          </View>
        </View>
        <View style={styles.gameContaier}>
          <GameBoard board={board} setBoard={setBoard} turn={turn} />
        </View>
        <View style={styles.switchContainer}>
          <XOSwitch value={firstTurn} onPress={setFirstTurn} />
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={clearBoard} style={styles.iconContainer}>
            <View style={styles.iconInner}>
              <FontAwesome name="refresh" size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
          <Button
            uppercase={false}
            labelStyle={{
              fontWeight: "bold",
              fontSize: 20,
              color: colors.tertiary,
            }}
            style={{
              borderWidth: 3,
              borderColor: colors.light,
              borderRadius: 40,
            }}
          >
            IS TTT
          </Button>
          <TouchableOpacity style={styles.iconContainer}>
            <View style={styles.iconInner}>
              <FontAwesome name="gear" size={40} color={colors.light} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  result: {
    alignItems: "center",
  },
  gameContaier: {
    flex: 1,
    padding: 50,
  },
  switchContainer: {
    alignItems: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.light,
    borderWidth: 2,
    padding: 5,
    borderRadius: 42,
  },
  iconInner: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
