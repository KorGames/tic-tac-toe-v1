import { Layout, Logo } from "components/common";
import { Button, Icon, VStack } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
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
          _text={{ fontSize: 30 }}
          startIcon={<Icon as={FontAwesome} name="play" />}
          onPress={() => nav.navigate("Game")}
        >
          Single Play
        </Button>
        <Button
          _text={{ fontSize: 20 }}
          disabled
          colorScheme="secondary"
          startIcon={<Icon as={FontAwesome} name="users" />}
        >
          Play Online (Soon)
        </Button>
      </VStack>
    </Layout>
  );
};

export default Home;
