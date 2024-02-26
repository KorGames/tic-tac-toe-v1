import { KorButton } from "components/Library/KorButton";
import { KorInput } from "components/Library/KorInput";
import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { font_size_tokens } from "utils/styles.utils";
import { Controller, useFormContext } from "react-hook-form";
import { IEmailSignUpForm } from "screens/sign-up-screen";
import { IEmailSignInForm } from "screens/sign-in-screen";

export const SignUpEmailForm = () => {
  /* ******************** Hooks ******************** */
  const { control, handleSubmit, formState } = useFormContext<IEmailSignUpForm | IEmailSignInForm>();
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <KorInput
            {...field}
            onChangeText={field.onChange}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            left_icon={<AntDesign name="user" size={font_size_tokens.lg} color="lightgray" />}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <KorInput
            {...field}
            onChangeText={field.onChange}
            placeholder="Password"
            secureTextEntry
            passwordRules={"minlength: 6;"}
            left_icon={<AntDesign name="lock" size={font_size_tokens.lg} color="lightgray" />}
            error={error?.message}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
  },
});
