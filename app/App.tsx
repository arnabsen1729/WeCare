import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import Home from "./screens/Home";
import Status from "./screens/Status";

import { RootStackParamList } from "./types";
import { ThemeContext } from "./theme";
import store from "./state/createStore";

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return <Text>Loading</Text>;
  else
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={{ mode: "dark" }}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Status"
                  component={Status}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeContext.Provider>
      </Provider>
    );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
});
