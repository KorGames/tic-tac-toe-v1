import auth from "@react-native-firebase/auth";

const anonymous_user_login = async () => (await auth().signInAnonymously()).user;

export const user_service = { anonymous_user_login };
