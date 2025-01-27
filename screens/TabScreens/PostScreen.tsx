import React from 'react';
import { SafeAreaView, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@/actions/users';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class PostScreen extends React.Component {

    render(){
        return (
            <SafeAreaView style={  {flex:1,}}>
                <View style={
                {width:screenWidth, height:55,  marginTop:30, justifyContent:'space-between', alignItems:"center", flexDirection:'row',}
                }>
                    <Text style={{margin:10, fontWeight:'bold', fontSize:22}}>Create a new post</Text>
                    <TouchableOpacity style={{margin:10}}
                    onPress={()=> this.uploadPost()}>
                        <Text style={{margin:10, fontWeight:'bold', fontSize:22, color:'blue'}}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(PostScreen)







