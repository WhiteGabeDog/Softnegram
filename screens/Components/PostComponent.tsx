import React, {Component} from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
const screenWidth = Dimensions.get('window').width;

export default class PostComponent extends Component {

    static propTypes = {
        prop: PropTypes
    };

    state = {
        numLike: 0,
        liked: undefined
    }
    likePost = () => {
        if (this.state.liked) {
            // If the user has already liked, unlike the post
            this.setState({
                liked: false,
                numLike: this.state.numLike - 1
            });
            this.props.unlikePost(this.props.item);
        } else {
            // If the user hasn't liked, like the post
            this.setState({
                liked: true,
                numLike: this.state.numLike + 1
            });
            this.props.likePost(this.props.item);
        }
    };
    render() {
        const { item } = this.props;
        const { liked } = this.state;

        return (
            <View>
                <View style={{ width: screenWidth, height: 60, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ width: 40, height: 40, margin: 10, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>
                                {item.username ? item.username.charAt(0).toUpperCase() : '?'}
                            </Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.username}</Text>
                    </View>
                    {
                        item.date ? new Date(item.date.seconds * 1000).toLocaleDateString() : 'Date not available'
                    }
                </View>
                <View style={{ width: screenWidth, height: 360 }}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {item.photos?.map((e, index) => (
                            <Image key={index} source={{ uri: e }} style={{ width: screenWidth, height: 360 }} />
                        ))}
                    </ScrollView>
                    <View style={{width:screenWidth, flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity
                            onPress={()=>this.likePost()}>
                                <Image source={require('../../assets/images/heart.png')} style={{height:20,width:20,margin:10}}/>   
                            </TouchableOpacity>
                            <text>Comment</text>
                        </View>
                    </View>
                </View>
                <Text style={{fontWeight:'bold', marginHorizontal:10, marginTop:0 }}>{
                this.props.item.likes.length + this.state.numLike
                } likes</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{item.username} </Text>
                    <Text>{item.description}</Text>
                </View>
            </View>
        );
    }
}
