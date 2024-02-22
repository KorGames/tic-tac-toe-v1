import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthRouterParamList = {};

export type AuthRouterScreenProps<T extends keyof AuthRouterParamList> = NativeStackScreenProps<AuthRouterParamList, T>;

export type MainRouterParamList = {
  Home: undefined;
  Game: { ai: boolean } | undefined;
  GameV2: undefined;
  GameSelect: undefined;
  OnlineGame: undefined;
  SignUp: undefined;
  LogIn: undefined;
};

export type MainRouterScreenProps<T extends keyof MainRouterParamList> = NativeStackScreenProps<MainRouterParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainRouterParamList {}
  }
}
