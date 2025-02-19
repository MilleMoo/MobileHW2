import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingApp from './src/screen/ShoppingApp';
import HomeScreen from "./src/screen/HomeScreen";
import RecipeDetailScreen from "./src/screen/RecipeDetailScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingApp">
        <Stack.Screen
          name="ShoppingApp"
          component={ShoppingApp}
          options={{ title: "ShoppingApp" }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: "RecipeDetailScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  export default App;
