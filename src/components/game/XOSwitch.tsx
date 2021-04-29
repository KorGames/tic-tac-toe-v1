import React, { SetStateAction, useState, Dispatch } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "style";

interface Props {
  value: "X" | "O";
  onPress: Dispatch<SetStateAction<"X" | "O">>;
}

const XOSwitch: React.FC<Props> = (props) => {
  const { value, onPress } = props;

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress((prevState) => (prevState === "O" ? "X" : "O"))}
    >
      <View
        style={[
          styles.value,
          value === "X" && { backgroundColor: colors.secondary },
        ]}
      >
        <FontAwesome
          name="close"
          size={30}
          color={value === "X" ? colors.white : colors.secondary}
        />
      </View>
      <View
        style={[
          styles.value,
          value === "O" && { backgroundColor: colors.primary },
        ]}
      >
        <FontAwesome
          name="circle-o"
          size={30}
          color={value === "O" ? colors.white : colors.primary}
        />
      </View>
    </Pressable>
  );
};

export default XOSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: colors.light,
    borderRadius: 23,
  },
  value: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: colors.secondary,
  },
});
