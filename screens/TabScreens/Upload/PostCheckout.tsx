import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@/actions/users';
import { updateDescription } from '@/actions/post';

class PostCheckout extends React.Component {

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <TextInput
                placeholderTextColor={'grey'}
                placeholder={'Type in your description here'}
                onChangeText={input=>this.props.updateDescription(input)}
                value={this.props.post.description}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(PostCheckout)







