import React, { useEffect } from "react";

import Cell from "./Cell";
import { HStack, VStack } from "native-base";

interface Props {}

const Board: React.FC<Props> = (props) => {
  return (
    <VStack
      space={5}
      flex={1}
      backgroundColor="tertiary.800"
      padding={5}
      borderRadius={10}
    >
      <HStack space={5} flex={1}>
        <Cell id={0} />
        <Cell id={1} />
        <Cell id={2} />
      </HStack>
      <HStack space={5} flex={1}>
        <Cell id={3} />
        <Cell id={4} />
        <Cell id={5} />
      </HStack>
      <HStack space={5} flex={1}>
        <Cell id={6} />
        <Cell id={7} />
        <Cell id={8} />
      </HStack>
    </VStack>
  );
};

export default Board;
