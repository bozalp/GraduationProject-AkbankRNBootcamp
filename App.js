/*
.
Akbank React Native Bootcamp Graduation Project
Batuhan OZALP - github.com/bozalp
.
*/
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/Pages/SplashScreen/SplashScreen';
import Home from './src/Navigation/Home';
import SignIn from './src/Pages/SignPages/SignIn';
import SignUp from './src/Pages/SignPages/SignUp';

import { Provider, useSelector } from 'react-redux';
import { store } from "./src/Toolkits/store";
import themeSlice, { setDark, setLight } from './src/Toolkits/themeSlice';
import lightTheme from './src/Themes/light';
import darkTheme from './src/Themes/dark';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#978cfa"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false
          }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{
            headerShown: false
          }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{
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