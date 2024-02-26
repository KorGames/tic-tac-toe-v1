import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firebase_firestore from "@react-native-firebase/firestore";
import { IRoom } from "types/room.types";

export type IFunctionResponse<V, E = string> = [value: V | null, error: E | null];

const anonymous_user_login = async () => (await auth().signInAnonymously()).user;
const sign_up = async (email: string, password: string): Promise<IFunctionResponse<FirebaseAuthTypes.User>> => {
  try {
    return [(await auth().createUserWithEmailAndPassword(email, password)).user, null];
  } catch (error) {
    const typed_error = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    if (typed_error.code === "auth/email-already-in-use") return [null, "The email address is already in use by another account."];
    if (typed_error.code === "auth/invalid-email") return [null, "The email address is invalid."];
    if (typed_error.code === "auth/operation-not-allowed") return [null, "Email/password accounts are not enabled."];
    if (typed_error.code === "auth/weak-password") return [null, "The password is too weak."];
    return [null, "An unknown error occurred."];
  }
};

const sing_in = async (email: string, password: string): Promise<IFunctionResponse<FirebaseAuthTypes.User>> => {
  try {
    return [(await auth().signInWithEmailAndPassword(email, password)).user, null];
  } catch (error) {
    const typed_error = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    if (typed_error.code === "auth/invalid-email") return [null, "The email address is invalid."];
    if (typed_error.code === "auth/user-disabled") return [null, "The user corresponding to the given email has been disabled."];
    if (typed_error.code === "auth/user-not-found") return [null, "There is no user corresponding to the given email."];
    if (typed_error.code === "auth/wrong-password") return [null, "The password is invalid for the given email."];
    if (typed_error.code === "auth/invalid-credential") return [null, "Email is used with a different sign in method."];
    console.log(typed_error);
    return [null, "An unknown error occurred."];
  }
};

export const get_game_history = async (user_id: string) => {
  const x_game_history_snap = firebase_firestore().collection("rooms").where("x_player_id", "==", user_id).get();
  const o_game_history_snap = firebase_firestore().collection("rooms").where("o_player_id", "==", user_id).get();

  const [x_game_history, o_game_history] = await Promise.all([x_game_history_snap, o_game_history_snap]);
  const game_history = x_game_history.docs.concat(o_game_history.docs);
  const game_history_docs = game_history.map((doc) => doc.data()) as IRoom[];

  return game_history_docs;
};

export const user_service = { anonymous_user_login, sign_up, sing_in, get_game_history };
