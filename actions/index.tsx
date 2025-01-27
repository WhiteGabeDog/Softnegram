import * as ImageManipulator from 'expo-image-manipulator';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { storage } from '@/config/Firebase'
import uuid from 'react-native-uuid'; // Ensure this library is installed and imported

export const uploadPhoto = (image) => {
    return async (dispatch) => { // Use redux-thunk to handle async action
      try {
        // Manipulate the image if necessary
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          image.uri, // The URI of the image
          [{ resize: { width: 800 } }], // Example: resize the image to width 800px
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Adjust compression and format
        );
  
        // Get the manipulated image URI
        const { uri } = manipulatedImage;
  
        // Create a unique filename using UUID
        const fileName = uuid.v4() + '.jpg';
  
        // Get a reference to Firebase Storage
        const storageRef = ref(storage, 'photos/' + fileName);
  
        // Fetch the image data
        const response = await fetch(uri);
        const blob = await response.blob();
  
        // Upload the image to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, blob);
        console.log('Uploaded image: ', uploadResult);
  
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded successfully. URL: ', downloadURL);
  
        // Dispatch success action (optional)
        dispatch({
          type: 'UPLOAD_PHOTO_SUCCESS',
          payload: downloadURL,
        });
  
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image: ', error);
  
        // Dispatch failure action (optional)
        dispatch({
          type: 'UPLOAD_PHOTO_FAILURE',
          payload: error.message,
        });
      }
    };
  };