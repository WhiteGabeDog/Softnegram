import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class Signup extends React.Component {

  state = {
    niceNumber: 0
  }

  adding = () => {
    this.setState({niceNumber: this.state.niceNumber+1})
  }
  substract = () => {
    this.setState({niceNumber: this.state.niceNumber-1})
  }

  setToZero = () =>{
    this.setState({niceNumber:0})
  }

  render(){
    return (
      <View style={{   flex: 1,  backgroundColor: 'blue',  alignItems: 'center',  justifyContent: 'center',}}>
          <Text>
            Signup page
          </Text>

            <TouchableOpacity 
            style={{backgroundColor:'black', margin:10, padding:10, borderRadius:5}}
            onPress={()=> this.props.navigation.navigate('Login')}>
                <Text style={{color:'white'}}>Go to login page</Text>
            </TouchableOpacity>
      </View>
    );
  }
}


