import { signInAnonymously } from "firebase/auth";
import { firebase_auth } from "utils/firebase.utils";

const anonymous_user_login = async () => (await signInAnonymously(firebase_auth)).user;

export const user_service = { anonymous_user_login };
