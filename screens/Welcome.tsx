import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/Firebase';
import { getUser } from '@/actions/users';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Login extends React.Component  {

    componentDidMount = () => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                this.props.getUser(user.uid);
                if (this.props.user) {
                    // Navigate to the main app screen
                    this.props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'StackNavigator' }],
                    });
                  }
                } else {
                    this.props.navigation.navigate('Login')
                }
        })
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Text>Waiting</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return{ 
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
