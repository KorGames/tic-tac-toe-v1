import { KorButton } from "components/Library/KorButton";
import { KorText } from "components/Library/KorText";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { theme_tokens } from "utils/styles.utils";

interface IAsyncPromptProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  confirm_text?: string;
  cancel_text?: string;
  hide_cancel?: boolean;
  hide_confirm?: boolean;
}

export const AsyncPromptContext = React.createContext<{
  start_async_prompt: (props: IAsyncPromptProps) => Promise<"confirm" | "cancel">;
  close_async_prompt: () => void;
}>({
  start_async_prompt: () => {
    return new Promise<"confirm" | "cancel">((resolve, reject) => {
      resolve("cancel");
    });
  },
  close_async_prompt: () => {},
});

export const AsyncPromptProvider = ({ children }: React.PropsWithChildren) => {
  const [show, _set_show] = React.useState(false);
  const [props, _set_props] = React.useState<IAsyncPromptProps>({});

  const promiseRef = React.useRef<{
    resolve: (value: "confirm" | "cancel") => void;
    reject: () => void;
  }>({
    resolve: () => {},
    reject: () => {},
  });

  const start_async_prompt = (props: IAsyncPromptProps) => {
    _set_show(true);
    _set_props(props);
    return new Promise<"confirm" | "cancel">((resolve, reject) => {
      promiseRef.current = {
        resolve,
        reject,
      };
    });
  };

  const close_async_prompt = () => {
    _set_show(false);
    promiseRef.current.resolve("cancel");
  };

  return (
    <AsyncPromptContext.Provider value={{ start_async_prompt, close_async_prompt }}>
      {children}
      <Modal
        visible={show}
        onRequestClose={() => {
          _set_show(false);
        }}
        transparent
      >
        <View style={styles.container}>
          <View style={styles.card}>
            {typeof props.title === "string" ? (
              <KorText weight="bold" style={{ color: theme_tokens.tertiary.main }}>
                {props.title}
              </KorText>
            ) : (
              props.title || null
            )}
            {typeof props.description === "string" ? (
              <KorText style={{ textAlign: "center", color: theme_tokens.tertiary.main }}>{props.description}</KorText>
            ) : (
              props.description || null
            )}
            <View style={{ alignItems: "center", flexDirection: "row", columnGap: 4, justifyContent: "center" }}>
              {!props.hide_cancel && (
                <KorButton
                  onPress={() => {
                    promiseRef.current.resolve("cancel");
                    _set_show(false);
                  }}
                >
                  {props.cancel_text || "Cancel"}
                </KorButton>
              )}
              {!props.hide_confirm && (
                <KorButton
                  onPress={() => {
                    promiseRef.current.resolve("confirm");
                    _set_show(false);
                  }}
                >
                  {props.confirm_text || "Confirm"}
                </KorButton>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </AsyncPromptContext.Provider>
  );
};

export const useAsyncPrompt = () => {
  return React.useContext(AsyncPromptContext);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme_tokens.dark.light,
    padding: 16,
    borderRadius: 8,
    width: "80%",
    rowGap: 8,
  },
});
