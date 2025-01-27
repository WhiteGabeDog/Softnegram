import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Login from './Login';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateEmail,updatePassword,updateUsername, signup } from '@/actions/users';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class Signup extends React.Component  {

  state = {
    repeat:'' // This is for the repeat password
  }
  onLoginPress = () => {
    if(this.props.user.password == this.state.repeat && this.props.user.username !== ''){
      this.props.signup()
    }else{
      alert('the passcode are different')
    }
  }
  render(){
    return (
        <View style={styles.container}>
            <View style={{width:screenWidth*0.9, marginTop:10 }}>
                <Text style={{left:15}}>Username</Text>
            </View>
            <TextInput style={{ height:50, width:screenWidth*0.9 ,backgroundColor:'white', color:'black',paddingHorizontal:20, borderRadius:10,borderColor: 'grey', borderWidth:1}}
            placeholderTextColor={'grey'}
            placeholder={'your username'}
            onChangeText={input=>this.props.updateUsername(input)}
            value={this.props.user.username}
            />
            <View style={{width:screenWidth*0.9, marginTop:10 }}>
                <Text style={{left:15}}>Email</Text>
            </View>
            <TextInput style={{ height:50, width:screenWidth*0.9 ,backgroundColor:'white', color:'black',paddingHorizontal:20, borderRadius:10,borderColor: 'grey', borderWidth:1}}
            placeholderTextColor={'grey'}
            placeholder={'your username'}
            onChangeText={input=>this.props.updateEmail(input)}
            value={this.props.user.email}
            />
            <View style={{width:screenWidth*0.9, marginTop:10 }}>
                <Text style={{left:15}}>Password</Text>
            </View>
            <TextInput style={{ height:50, width:screenWidth*0.9, backgroundColor:'white', color:'black',paddingHorizontal:20,margin:0, borderRadius:10,borderColor: 'grey', borderWidth:1}}
            placeholderTextColor={'grey'}
            placeholder={'Passcode123'}
            onChangeText={input=>this.props.updatePassword(input)}
            value={this.props.user.password}
            secureTextEntry={true}
            />

            <View style={{width:screenWidth*0.9, marginTop:10 }}>
                <Text style={{left:15}}>Repeat Password</Text>
            </View>
            <TextInput style={{ height:50, width:screenWidth*0.9, backgroundColor:'white', color:'black',paddingHorizontal:20,margin:0, borderRadius:10,borderColor: 'grey', borderWidth:1}}
            placeholderTextColor={'grey'}
            placeholder={'Repeat Passcode'}
            onChangeText={input=>this.setState({repeat: input})}
            value={this.state.repeat}
            secureTextEntry={true}
            />
            <TouchableOpacity style={{width:screenWidth*0.6, height:50, marginTop:30, borderRadius:30, backgroundColor: '#0095f6', justifyContent:'center', alignItems:'center'}}
              onPress={()=>this.onLoginPress()}>
              <Text style={{color:'white',fontWeight:'bold', fontSize: 20 }}>SIGNUP</Text>
            </TouchableOpacity>
        </View>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateEmail,updatePassword,updateUsername, signup }, dispatch)
}

const mapStateToProps = (state) => {
  return{ 
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})