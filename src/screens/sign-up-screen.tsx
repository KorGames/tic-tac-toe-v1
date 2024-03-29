import { useNavigation } from "@react-navigation/native";
import { KorButton } from "components/Library/KorButton";
import { KorDivider } from "components/Library/KorDivider";
import { KorText } from "components/Library/KorText";
import { Logo } from "components/common/Logo";
import { auth_with_apple, auth_with_google } from "hooks/useAuth";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MainRouterScreenProps } from "types/navigation";
import { AntDesign } from "@expo/vector-icons";
import { font_size_tokens } from "utils/styles.utils";
import { SignUpEmailForm } from "components/sign-up/sign-up-email-form";
import { user_service } from "services/user.service";
import { KorFullSpinner } from "components/Library/KorFullSpinner";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const sign_up_form_schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export interface IEmailSignUpForm extends z.infer<typeof sign_up_form_schema> {}

export const SignUpScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"SignUp">["navigation"]>();
  const form = useForm<IEmailSignUpForm>({
    resolver: zodResolver(sign_up_form_schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const on_sign_up = async (values: IEmailSignUpForm) => {
    try {
      const [_, error] = await user_service.sign_up(values.email, values.password);
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
        Create your account
      </KorText>
      <FormProvider {...form}>
        <SignUpEmailForm />
        <KorButton onPress={form.handleSubmit(on_sign_up)}>Sign Up</KorButton>
      </FormProvider>
      <View style={styles.divider_container}>
        <KorDivider />
        <KorText>OR</KorText>
        <KorDivider />
      </View>
      <KorButton onPress={auth_with_apple} color="tertiary" left_icon={<AntDesign name="apple1" size={font_size_tokens.lg} />}>
        Continue with Apple
      </KorButton>
      <KorButton onPress={auth_with_google} color="tertiary" left_icon={<AntDesign name="google" size={font_size_tokens.lg} />}>
        Continue with Google
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
