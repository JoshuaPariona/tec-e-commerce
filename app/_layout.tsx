import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import messaging from '@react-native-firebase/messaging';

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import store from "@/store";

import { initializeApp } from "firebase/app";
import { setToken } from "@/store/deviceTokenSlice";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjruNaQeS-OlPSdmsf7vhwI5nyuNREdEI",
  authDomain: "tec-e-commerce.firebaseapp.com",
  databaseURL: "https://tec-e-commerce-default-rtdb.firebaseio.com",
  projectId: "tec-e-commerce",
  storageBucket: "tec-e-commerce.firebasestorage.app",
  messagingSenderId: "637984304471",
  appId: "1:637984304471:web:29a1719a4fe9c169952212",
};
console.log("pasa")
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Messaging>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          ></Stack>
        </Messaging>
      </Provider>
    </ThemeProvider>
  );
}

const Messaging = ({ children }) => {
  /*
  const dispatch = useDispatch();
  useEffect(() => {
    messaging()
      .requestPermission()
      .then(() => {
        console.log("Permission status:", messaging().hasPermission());
      })
      .catch((error) => {
        console.log("Permission rejected", error);
      });

    
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          dispatch(setToken(fcmToken)); 
          console.log("Token:", fcmToken);
        } else {
          console.log("Failed to get token");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
      });
    const unsubscribe = messaging().onTokenRefresh((newToken) => {
      dispatch(setToken(newToken)); // Actualiza el token en el caso de que cambie
      console.log("Refreshed Token:", newToken);
    });
    return unsubscribe; // Limpiar el listener al desmontar el componente
  }, []);*/
  return <>{children}</>;
};
