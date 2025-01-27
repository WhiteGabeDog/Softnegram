import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@/screens/TabScreens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import PostScreen from '@/screens/TabScreens/PostScreen';
import { FontAwesome } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
      <Tab.Screen name='Post' component={PostScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} 
            options={({ route}) => ({
                tabBarIcon: ({color, size }) => (
                    <FontAwesome name='user' color={color} size={25} />
                )
            })} 
      />
    </Tab.Navigator>
  );
}