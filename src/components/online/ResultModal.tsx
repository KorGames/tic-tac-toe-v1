import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Heading, Icon, Modal, Spinner } from "native-base";
import { useAppDispatch, useAppSelector } from "store/store";
import { showResultModal } from "store/slices/modalSlice";
import { useNavigation } from "@react-navigation/core";
import exitRoom from "lib/online/exitRoom";
import { roomSet } from "store/slices/onlineSlice";

interface Props {}

const ResultModal: React.FC<Props> = (props) => {
  const show = useAppSelector((state) => state.modal.result);
  const { room, user } = useAppSelector((state) => state.online);
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const handleClose = async () => {
    if (user && room) {
      await exitRoom(room?.id, user);
      dispatch(roomSet(null));
      dispatch(showResultModal(false));
    }
    nav.navigate("Home");
  };

  if (!room) {
    return (
      <Modal>
        <Modal.Content>
          <Modal.Body>
            <Spinner />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={show}
      onClose={() => dispatch(showResultModal(false))}
      size="md"
    >
      <Modal.Content backgroundColor="tertiary.700" borderRadius={10}>
        <Modal.Body alignItems="center">
          {room.winner === "X" ? (
            <Icon
              as={FontAwesome}
              name="close"
              size="3xl"
              color="primary.500"
            />
          ) : room.winner === "O" ? (
            <Icon
              as={FontAwesome}
              name="circle-o"
              size="3xl"
              color="secondary.500"
            />
          ) : (
            <Icon
              as={FontAwesome}
              name="balance-scale"
              size="3xl"
              color="light.500"
            />
          )}
          {room.winner === "draw" ? (
            <Heading color="light.500">DRAW</Heading>
          ) : (
            <Heading
              color={room.winner === "X" ? "primary.500" : "secondary.500"}
            >
              WINS
            </Heading>
          )}
          <Button onPress={handleClose}>Close</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ResultModal;
