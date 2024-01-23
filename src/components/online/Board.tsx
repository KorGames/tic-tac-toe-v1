import React from "react";
import { View } from "react-native";
import { Cell } from "./Cell";

export const Board = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <View>
        <Cell id={0} />
        <Cell id={1} />
        <Cell id={2} />
      </View>
      <View>
        <Cell id={3} />
        <Cell id={4} />
        <Cell id={5} />
      </View>
      <View>
        <Cell id={6} />
        <Cell id={7} />
        <Cell id={8} />
      </View>
    </View>
  );
};
