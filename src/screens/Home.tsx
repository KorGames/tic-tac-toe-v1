import { Layout, Logo } from "components/common";
import { Button, Icon, VStack } from "native-base";
import React from "react";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const nav = useNavigation();
  return (
    <Layout>
      <VStack
        padding={10}
        space={10}
        justifyContent="center"
        alignItems="stretch"
      >
        <Logo />
        <Button
          startIcon={<Icon as={FontAwesome5} name="robot" />}
          onPress={() => nav.navigate("Game", { ai: true })}
        >
          Single Play
        </Button>
        <Button
          startIcon={<Icon as={FontAwesome5} name="user-friends" />}
          onPress={() => nav.navigate("Game" as any)}
        >
          Two Players
        </Button>
        <Button
          onPress={() => nav.navigate("WaitingRoom")}
          colorScheme="secondary"
          startIcon={<Icon as={FontAwesome5} name="users" />}
        >
          Play Online (Soon)
        </Button>
      </VStack>
    </Layout>
  );
};

export default Home;
