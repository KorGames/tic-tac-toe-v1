import React, { SetStateAction, useState, Dispatch } from "react";
import { Box, Icon, Pressable } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  value: "X" | "O";
  onPress: Dispatch<SetStateAction<"X" | "O">>;
}

const XOSwitch: React.FC<Props> = (props) => {
  const { value, onPress } = props;

  return (
    <Pressable
      flexDirection="row"
      borderWidth={5}
      borderColor="primary.500"
      borderRadius={50}
      height={60}
      onPress={() => onPress((prevState) => (prevState === "O" ? "X" : "O"))}
    >
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={50}
        width={50}
        height={50}
        backgroundColor={value === "X" ? "primary.500" : undefined}
      >
        <Icon
          as={FontAwesome}
          name="close"
          color={value === "X" ? "white" : "primary.500"}
        />
      </Box>
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={50}
        width={50}
        height={50}
        backgroundColor={value === "O" ? "primary.500" : undefined}
      >
        <Icon
          as={FontAwesome}
          name="circle-o"
          color={value === "O" ? "white" : "secondary.500"}
        />
      </Box>
    </Pressable>
  );
};

export default XOSwitch;
