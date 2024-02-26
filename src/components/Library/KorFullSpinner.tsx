import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from "react-native";

export interface IKorFullSpinnerProps {
  spinning: boolean;
}

export const KorFullSpinner = ({ spinning }: IKorFullSpinnerProps) => {
  /* ******************** Hooks ******************** */
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  useEffect(() => {
    navigation.setOptions({ headerShown: !spinning });
  }, [spinning]);

  /* ******************** JSX ******************** */
  if (!spinning) return null;
  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 1000,
  },
});
