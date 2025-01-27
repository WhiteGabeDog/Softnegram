import React from 'react';
import { FlatList, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@/actions/users';
import { getPosts } from '@/actions/post';

import PostComponent from '@/screens/Components/PostComponent';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


class HomeScreen extends React.Component {

    componentDidMount = () => {
        this.props.getPosts()
      }
      render(){
  
          return (
              <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                  <FlatList
                  data={this.props.post.feed}
                  keyExtractor={(item) => JSON.stringify(item.uid)}
                  renderItem={({item}) => (
                      <PostComponent
                      item={item}
                      user={this.props.user}
                      />
                  )}
                  />
              </View>
          );
      }
  
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)







