import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo';
import Login from '@/screens/Login';
import Welcome from '@/screens/Welcome';
import Signup from '@/screens/Signup';
import StackNavigator from './StackNavigator';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
            <Stack.Navigator>
                <Stack.Screen name='Welcome'  component={Welcome} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false, title:'Login'}}/>
                <Stack.Screen name='Signup'  component={Signup} options={{headerShown:true}}/>
                <Stack.Screen name='StackNavigator' component={StackNavigator}  options={{headerShown: false,}}/>
            </Stack.Navigator>
    )
}