import appleAuth from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

export interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
});

export const sign_out = async () => {
  await auth().signOut();
};

export async function auth_with_apple() {
  console.log(appleAuth.isSupported);
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error("Apple Sign-In failed - no identify token returned");
  }

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  // use credentialState response to ensure the user is authenticated
  if (credentialState !== appleAuth.State.AUTHORIZED) {
    throw new Error("Apple Sign-In failed - the user is not authenticated");
  }
  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
}

export async function auth_with_google() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export async function auth_with_facebook() {}

export async function auth_with_email_and_password(email: string, password: string) {
  return auth().signInWithEmailAndPassword(email, password);
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, set_user] = React.useState<IAuthContext["user"]>(null);
  const navigation = useNavigation();

  const value: IAuthContext = React.useMemo(
    () => ({
      user,
    }),
    [user]
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => {
      set_user(u);
      if (u) {
        navigation.navigate("Home");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn("If this function executes, User Credentials have been Revoked");
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
