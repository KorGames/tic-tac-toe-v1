import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Surface, Text, Title } from "react-native-paper";
import { colors } from "style";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  hideModal: () => any;
  winner: "X" | "O" | null;
}

const ResultModal: React.FC<Props> = (props) => {
  const { visible, hideModal, winner } = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={hideModal}
      transparent
      animationType="slide"
    >
      <TouchableOpacity onPress={hideModal} style={styles.centeredView}>
        <Surface style={styles.modalView}>
          {winner ? (
            winner === "X" ? (
              <FontAwesome name="close" size={75} color={colors.secondary} />
            ) : (
              <FontAwesome name="circle-o" size={75} color={colors.primary} />
            )
          ) : (
            <FontAwesome
              name="balance-scale"
              size={75}
              color={colors.tertiary}
            />
          )}
          {winner ? (
            <Text
              style={{
                ...styles.text,
                color: winner === "O" ? colors.primary : colors.secondary,
              }}
            >
              WINS
            </Text>
          ) : (
            <Text style={{ ...styles.text, color: colors.tertiary }}>DRAW</Text>
          )}
        </Surface>
      </TouchableOpacity>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5,
  },
  text: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "bold",
  },
});
