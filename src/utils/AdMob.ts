import Constants from "expo-constants";

const testID = "ca-app-pub-3940256099942544/6300978111";
const productionID = "ca-app-pub-7199910147118397/2949045745";
// Is a real device and running in production.
export const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;
