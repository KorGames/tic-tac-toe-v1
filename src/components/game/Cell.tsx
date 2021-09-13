import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Icon, Pressable } from "native-base";

interface Props {
  value: "X" | "O" | null;
  onPress: () => void;
}

const Cell: React.FC<Props> = (props) => {
  const { value, onPress } = props;

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

  return (
    <Pressable
      flex={1}
      onPress={onPress}
      borderRadius={10}
      backgroundColor="tertiary.700"
      justifyContent="center"
      alignItems="center"
    >
      {getIcon(value)}
    </Pressable>
  );
};

export default Cell;
