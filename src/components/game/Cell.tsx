import React, { Dispatch } from "react";
import { Pressable, PressableProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "style";

interface Props extends PressableProps {
  value: "X" | "O" | null;
}

const Cell: React.FC<Props> = (props) => {
  const { value } = props;

  const getIcon = (value: null | "X" | "O") => {
    if (value === "X") {
      return <FontAwesome name="close" size={60} color={colors.secondary} />;
    } else if (value === "O") {
      return <FontAwesome name="circle-o" size={60} color={colors.primary} />;
    } else {
      return null;
    }
  };

  return <Pressable {...props}>{getIcon(value)}</Pressable>;
};

export default Cell;
