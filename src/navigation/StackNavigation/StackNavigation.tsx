import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";

import PokemonScreen from "../../screens/Pokemon/PokemonScreen";

const Stack = createStackNavigator();

const StackNavigation = (): ReactElement => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Pokemon">
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default StackNavigation;