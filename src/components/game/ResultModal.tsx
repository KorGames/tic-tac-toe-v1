import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "store/store";
import { showResultModal } from "store/slices/modalSlice";

interface Props {}

export const ResultModal: React.FC<Props> = (props) => {
  const show = useAppSelector((state) => state.modal.result);
  const dispatch = useAppDispatch();

  return (
    // <Modal isOpen={show} onClose={() => dispatch(showResultModal(false))} size="md">
    //   <Modal.Content backgroundColor="tertiary.700" borderRadius={10}>
    //     <Modal.Body alignItems="center">
    //       {winner === "X" ? (
    //         <Icon as={FontAwesome} name="close" size="3xl" color="primary.500" />
    //       ) : winner === "O" ? (
    //         <Icon as={FontAwesome} name="circle-o" size="3xl" color="secondary.500" />
    //       ) : (
    //         <Icon as={FontAwesome} name="balance-scale" size="3xl" color="light.500" />
    //       )}
    //       {winner === "draw" ? (
    //         <Heading color="light.500">DRAW</Heading>
    //       ) : (
    //         <Heading color={winner === "X" ? "primary.500" : "secondary.500"}>WINS</Heading>
    //       )}
    //     </Modal.Body>
    //   </Modal.Content>
    // </Modal>
    null
  );
};
