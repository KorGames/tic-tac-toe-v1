import { HStack, Text, VStack } from "native-base";
import React from "react";

const Logo = () => {
  return (
    <VStack>
      <HStack justifyContent="center">
        <Text bold shadow={5} fontSize="6xl" color="primary.500">
          T
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="secondary.500">
          I
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="primary.500">
          C
        </Text>
      </HStack>
      <HStack justifyContent="center">
        <Text bold shadow={5} fontSize="6xl" color="secondary.500">
          T
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="primary.500">
          A
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="secondary.500">
          C
        </Text>
      </HStack>
      <HStack justifyContent="center">
        <Text bold shadow={5} fontSize="6xl" color="primary.500">
          T
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="secondary.500">
          O
        </Text>
        <Text bold shadow={5} fontSize="6xl" color="primary.500">
          E
        </Text>
      </HStack>
    </VStack>
  );
};

export default Logo;
