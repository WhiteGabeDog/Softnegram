import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import PostCheckout from './../screens/TabScreens/Upload/PostCheckout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { uploadPost, getPosts } from '../actions/post';

const Stack = createStackNavigator();

class MyStack extends React.Component {

  uploadPost = () => {
    this.props.navigation.navigate('TabNavigator')
    alert('Posted!')
    this.props.uploadPost()
    this.props.getPosts()
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="PostCheckout" component={PostCheckout} 
          options={{
            headerShown:true, headerTitle:'See your post',
            headerRight: () => (
              <TouchableOpacity style={{margin:20, flexDirection:'row'}}
              onPress={()=>this.uploadPost()}>
                <Text style={{color:'blue', fontWeight:'bold',fontSize:20,marginHorizontal:5}}>POST</Text>
                <FontAwesome name='check' color={'blue'} size={25}/>
              </TouchableOpacity>
            ),
          }}
          />
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPost, getPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
      user: state.user,
      post: state.post,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStack);
