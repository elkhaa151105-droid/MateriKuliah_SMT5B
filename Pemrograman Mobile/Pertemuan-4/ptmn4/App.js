import 'react-native-gesture-handler'; // harus paling atas
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import Signup from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        headerStyle: { backgroundColor: '#0284c7' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        drawerActiveTintColor: '#0284c7',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Beranda"
        component={HomeScreen}
        options={{ title: 'Beranda', drawerLabel: '🏠 Beranda' }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{ title: 'Profil', drawerLabel: '👤 Profil' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Daftar Akun Baru' }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}