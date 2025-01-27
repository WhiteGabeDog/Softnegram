import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions} from 'react-native';
import { updateEmail, updatePassword } from '@/actions/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default class Signup extends React.Component {

  render(){
    return (
      <View style={{   flex: 1,  backgroundColor: 'blue',  alignItems: 'center',  justifyContent: 'center',}}>
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Username</Text>
              </View>
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Email</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'example@example.com'}
              // value={this.props.user.email}
              // onChangeText={input=>this.props.updateEmail(input)}
              onChangeText={input=>this.props.updateEmail(input)}
              value={this.props.user.email}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Password</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'Passcode123'}
              onChangeText={input=>this.props.updatePassword(input)}
              value={this.props.user.password}
              secureTextEntry={true}
              />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword }, dispatch)
}
const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(Signup)