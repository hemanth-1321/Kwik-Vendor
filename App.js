import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import register from './screens/register';
import landingPage from './components/landingPage';
import grocery from './screens/grocery';
import vegetable from './screens/vegetable';
import fruits from './screens/fruits';
import vegefruits from './screens/VegeFruits';
import restaurant from './screens/restaurant';
import veg from './screens/veg';
import nonveg from './screens/nonveg';
import cafes from './screens/cafes';
import chaats from './screens/chaats';
import events from './screens/event';
import catering from './screens/catering';
import vegcater from './screens/vegcater';
import nonvegcater from './screens/nonvvegcater';
import movies from './screens/movies';
import meenakshi from './screens/meenakshi';
import lakshmi from './screens/lakshmi';
import Thanks from './screens/thanks';
import ComingSoon from './screens/comingsoon';

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'InriaSerif-Bold': require('./assets/fonts/InriaSerif-Bold.ttf'),
    'ArchivoBlack-Regular': require('./assets/fonts/ArchivoBlack-Regular.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="Register"
          component={register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={landingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Grocery"
          component={grocery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vegetable"
          component={vegetable}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fruits"
          component={fruits}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VegeFruits"
          component={vegefruits}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Restaurant"
          component={restaurant}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Veg"
          component={veg}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NonVeg"
          component={nonveg}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cafes"
          component={cafes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chaats"
          component={chaats}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Catering"
          component={catering}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VegCater"
          component={vegcater}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NonVegCater"
          component={nonvegcater}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Movies"
          component={movies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Meenakshi"
          component={meenakshi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lakshmi"
          component={lakshmi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Thanks"
          component={Thanks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoon}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
