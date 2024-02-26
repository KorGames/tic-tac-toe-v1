import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { font_size_tokens, theme_tokens } from "utils/styles.utils";
import { KorText } from "./KorText";

export interface IKorInputProps extends React.ComponentProps<typeof TextInput> {
  _input_container?: React.ComponentProps<typeof View>;
  left_icon?: React.ReactNode;
  right_icon?: React.ReactNode;
  error?: string;
}
export type IKorInputRef = React.ComponentRef<typeof TextInput>;

export const KorInput = React.forwardRef<IKorInputRef, IKorInputProps>(
  ({ _input_container, left_icon, right_icon, error, ...text_input_props }, ref) => {
    /* ******************** Hooks ******************** */
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
      <View style={styles.form_control_container}>
        <View {..._input_container} style={[styles.input_container, _input_container?.style]}>
          {left_icon}
          <TextInput
            ref={ref}
            {...text_input_props}
            placeholderTextColor={theme_tokens.tertiary.main}
            style={[styles.text_input, text_input_props.style]}
          />
          {right_icon}
        </View>
        {!!error && <KorText style={styles.error_text}>{error}</KorText>}
      </View>
    );
  }
);

KorInput.displayName = "KorInput";

const styles = StyleSheet.create({
  form_control_container: {
    alignItems: "flex-start",
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 10,
    columnGap: 10,
  },
  text_input: { paddingVertical: 10, color: "white", fontSize: font_size_tokens.md, flex: 1 },
  error_text: { color: "red" },
});
