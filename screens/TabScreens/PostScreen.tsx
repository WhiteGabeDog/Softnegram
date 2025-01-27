import React from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';
import { uploadPhoto } from './../../actions/index';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '@/actions/users';
import { updateNextPhoto } from '@/actions/post';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class PostScreen extends React.Component {

    state = {
        urlChosen: undefined
    }
    openLibrary = async () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*'; // Allow only image files
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const base64Image = reader.result; // This is the base64 string of the image
                        
                        // Convert base64 string to a blob that can be uploaded to Firebase
                        const byteCharacters = atob(base64Image.split(',')[1]);
                        const byteArrays = [];
                        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                            const slice = byteCharacters.slice(offset, offset + 1024);
                            const byteNumbers = new Array(slice.length);
                            for (let i = 0; i < slice.length; i++) {
                                byteNumbers[i] = slice.charCodeAt(i);
                            }
                            byteArrays.push(new Uint8Array(byteNumbers));
                        }
                        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    
                        try {
                            // Pass the blob to the uploadPhoto function
                            const url = await this.props.uploadPhoto({ uri: URL.createObjectURL(blob) });
                            this.setState({urlChosen:url})
                            this.props.updateNextPhoto(url)
                            alert('Image uploaded successfully!');
                        } catch (uploadError) {
                            alert(`Failed to upload image: ${uploadError.message}`);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    uploadPost = () => {
        this.props.navigation.navigate('PostCheckout')
    }

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

                <View style={{width:screenWidth, height:360, }}>
                    {
                    (this.state.urlChosen == undefined)?
                    <TouchableOpacity style={{width:screenWidth, height:360, justifyContent:'center',alignItems:'center'}}  
                    onPress={()=> this.openLibrary()}>
                        <View style={{width:65, height:65, borderRadius:65/2, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:40}}>+</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    // onPress={alert(this.state.urlChosen)}
                    style={{width:screenWidth, height:360,}}>
                        <Image source={{uri: this.state.urlChosen }} style={{width:screenWidth, height:360,}}/>
                        <TouchableOpacity onPress={()=> this.removeImage(this.state.urlChosen)} style={{position:"absolute", bottom:30, right:40}}>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    }
                </View>
                
                <View style={{flexDirection:'row', width:screenWidth, justifyContent:'center',alignItems:'center', flex:1}}>
                    {
                        (this.props.post.photos == undefined || this.props.post.photos?.length == 5  || this.props.post.photos?.length == 0)
                        ?
                        null
                        :
                        <TouchableOpacity style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center', borderRadius:12, margin:10 }}
                        onPress={()=> this.openLibrary()}>
                            <View style={{width:40, height:40, borderRadius:20, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'white', fontSize:30}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        <View style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {this.props.post.photos?.map((e, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.changeChosenUrl(e)}
                                    style={{ margin: 5 }} // Adjust the margin to control spacing between images
                                >
                                    <Image
                                        source={{ uri: e }}
                                        style={{
                                            width: (screenWidth - 30) / 3, // 3 images per row, subtract margin space
                                            height: 90,
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                            borderRadius: 12,
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(PostScreen)







