import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@/screens/TabScreens/HomeScreen';
import PostScreen from '@/screens/TabScreens/PostScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
      <Tab.Screen name='Post' component={PostScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}