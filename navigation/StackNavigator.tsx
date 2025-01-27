import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator}  options={{headerShown: false,}}/>
        
        </Stack.Navigator>
    );
}