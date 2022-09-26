/*
.
Akbank React Native Bootcamp Graduation Project
Batuhan OZALP - github.com/bozalp
.
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/Pages/SplashScreen/SplashScreen';
import Home from './src/Pages/Home/Home';

import { Provider, useSelector } from 'react-redux';
import { store } from "./src/Toolkits/store";
import themeSlice, { setDark, setLight } from './src/Toolkits/themeSlice';
import lightTheme from './src/Themes/light';
import darkTheme from './src/Themes/dark';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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