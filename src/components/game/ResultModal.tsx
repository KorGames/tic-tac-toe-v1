import React from "react";
import { colors } from "style";
import { FontAwesome } from "@expo/vector-icons";
import { Heading, Icon, Modal, Text } from "native-base";

interface Props {
  visible: boolean;
  hideModal: () => any;
  winner: "X" | "O" | null;
}

const ResultModal: React.FC<Props> = (props) => {
  const { visible, hideModal, winner } = props;
  return (
    <Modal isOpen={visible} onClose={hideModal} size="md">
      <Modal.Content backgroundColor="tertiary.700" borderRadius={10}>
        <Modal.Body alignItems="center">
          {winner ? (
            winner === "X" ? (
              <Icon
                as={FontAwesome}
                name="close"
                size="3xl"
                color="primary.500"
              />
            ) : (
              <Icon
                as={FontAwesome}
                name="circle-o"
                size="3xl"
                color="secondary.500"
              />
            )
          ) : (
            <Icon
              as={FontAwesome}
              name="balance-scale"
              size="3xl"
              color="light.500"
            />
          )}
          {winner ? (
            <Heading color={winner === "X" ? "primary.500" : "secondary.500"}>
              WINS
            </Heading>
          ) : (
            <Heading color="light.500">DRAW</Heading>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ResultModal;
