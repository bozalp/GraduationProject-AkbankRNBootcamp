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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
            headerShown: false
          }}/>
        <Stack.Screen name="Home" component={Home} options={{
           title:"Best Chat App"
          }}/>
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
