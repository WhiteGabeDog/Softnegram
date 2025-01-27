import * as React from 'react';
import { View, Text } from 'react-native';
// import AppLoading from 'expo'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from '@/screens/Login';
import Signup from '@/screens/Signup';
const Stack = createStackNavigator();

export default function App() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false, title:'Login'}}/>
                    <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
}