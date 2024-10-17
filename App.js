import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Register } from "./AuthPages/Register";
import { LandingPage } from "./AuthPages/LandingPage";
import { CategoryPage } from "./AuthPages/CategorySelection";
import { SubCategoryPage } from "./AuthPages/SubCategoryPage";
import { ThankYouPage } from "./AuthPages/Thanks";
import { Home } from "./screens/HomeScreen";
import { ContactUs } from "./screens/ContactUs";
import { OrderHistory } from "./screens/OrderHistory";
import { PostItem } from "./screens/PostItem";
import { Received } from "./screens/RecivedOrder";
const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "InriaSerif-Bold": require("./assets/fonts/InriaSerif-Bold.ttf"),
    "ArchivoBlack-Regular": require("./assets/fonts/ArchivoBlack-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryPage"
          component={CategoryPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubCategoryPage"
          component={SubCategoryPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYouPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostItem"
          component={PostItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Received"
          component={Received}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
