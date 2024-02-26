import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { KorButton } from "components/Library/KorButton";
import { KorDivider } from "components/Library/KorDivider";
import { KorFullSpinner } from "components/Library/KorFullSpinner";
import { KorText } from "components/Library/KorText";
import { Logo } from "components/common/Logo";
import { SignUpEmailForm } from "components/sign-up/sign-up-email-form";
import { auth_with_apple, auth_with_google } from "hooks/useAuth";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Alert, View, StyleSheet } from "react-native";
import { user_service } from "services/user.service";
import { MainRouterScreenProps } from "types/navigation";
import { font_size_tokens } from "utils/styles.utils";
import { z } from "zod";
import { AntDesign } from "@expo/vector-icons";

export const signin_up_form_schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export interface IEmailSignInForm extends z.infer<typeof signin_up_form_schema> {}

export const SignInScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"SignIn">["navigation"]>();
  const form = useForm<IEmailSignInForm>({
    resolver: zodResolver(signin_up_form_schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const on_sign_in = async (values: IEmailSignInForm) => {
    try {
      const [_, error] = await user_service.sing_in(values.email, values.password);
      if (error) Alert.alert("Error", error);
    } catch (error) {
      Alert.alert("Error", "There was an error signing up. Please try again.");
    }
  };

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <KorFullSpinner spinning={form.formState.isSubmitting} />
      <Logo />
      <KorText weight="bold" size="xl">
        Log into your account
      </KorText>
      <FormProvider {...form}>
        <SignUpEmailForm />
        <KorButton onPress={form.handleSubmit(on_sign_in)}>Log In</KorButton>
      </FormProvider>
      <View style={styles.divider_container}>
        <KorDivider />
        <KorText>OR</KorText>
        <KorDivider />
      </View>
      <KorButton onPress={auth_with_apple} color="tertiary" left_icon={<AntDesign name="apple1" size={font_size_tokens.lg} />}>
        Log In with Apple
      </KorButton>
      <KorButton onPress={auth_with_google} color="tertiary" left_icon={<AntDesign name="google" size={font_size_tokens.lg} />}>
        Log In with Google
      </KorButton>
      {/* <KorButton color="tertiary">Continue with Facebook</KorButton> */}
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
