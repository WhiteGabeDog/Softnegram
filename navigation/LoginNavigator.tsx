import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo';
import Login from '@/screens/Login';
import Signup from '@/screens/Signup';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false, title:'Login'}}/>
                <Stack.Screen name='Signup'  component={Signup} options={{headerShown:true}}/>
            </Stack.Navigator>
    )
}