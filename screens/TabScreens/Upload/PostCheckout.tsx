import React from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@/actions/users';
import { updateDescription } from '@/actions/post';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class PostCheckout extends React.Component {

    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TextInput
                    placeholderTextColor={'grey'}
                    placeholder={'Type in your description here'}
                    onChangeText={(input) => this.props.updateDescription(input)}
                    value={this.props.user.description}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        borderRadius: 10,
                        width: screenWidth * 0.9,
                        fontSize: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        margin: 20,
                        alignSelf: 'center',
                    }}
                />

                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                >
                    {this.props.post?.photos?.length > 0 &&
                        this.props.post.photos.map((e, index) => (
                            <Image
                                key={index}
                                source={{ uri: e }}
                                style={{
                                    width: screenWidth, // Full width for each image
                                    height: 360,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                }}
                            />
                        ))}
                </ScrollView>
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







