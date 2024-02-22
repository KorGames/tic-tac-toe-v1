import { useNavigation } from "@react-navigation/native";
import { KorButton } from "components/Library/KorButton";
import { KorDivider } from "components/Library/KorDivider";
import { KorText } from "components/Library/KorText";
import { Logo } from "components/common/Logo";
import { auth_with_apple } from "hooks/useAuth";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MainRouterScreenProps } from "types/navigation";

export const SignUpScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"SignUp">["navigation"]>();
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <Logo />
      <KorText weight="bold" size="xl">
        Create your account
      </KorText>
      <KorButton>Sign Up with Email</KorButton>
      <View style={styles.divider_container}>
        <KorDivider />
        <KorText>OR</KorText>
        <KorDivider />
      </View>
      <KorButton onPress={auth_with_apple} color="tertiary">
        Continue with Apple
      </KorButton>
      <KorButton color="tertiary">Continue with Google</KorButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    rowGap: 20,
  },
  divider_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    width: "80%",
    alignSelf: "center",
  },
});
