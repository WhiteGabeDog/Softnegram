import { v4 as uuidv4 } from "uuid"; // Ensure you're using the correct UUID version
import { getFirestore, limit, getDocs, doc, query, updateDoc, orderBy, collection, arrayUnion,arrayRemove, serverTimestamp, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, auth } from "@/config/Firebase";

export const updateNextPhoto = (input) => {
    return async (dispatch, getState) => {
        try {
            let array = []
            const { post } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            });
            array.push(input)

            dispatch({type: 'UPDATE_POST_NEXT_PHOTO', payload: array})
        }catch(error){
            alert(error)
        }
    }
}

export const getPosts = (numberOfPosts) => {
	return async (dispatch, getState) => {
		const postsRef = collection(db, 'posts');
		const q = query(postsRef, orderBy('date', 'desc'), limit(numberOfPosts));
		const querySnapshot = await getDocs(q);

		let array = [];
		querySnapshot.forEach((doc) => {
			array.push(doc.data());
		});

		dispatch({ type: "GET_POSTS", payload: array });
	};
};

export const uploadPost = () => {
    return async (dispatch, getState) => {
      try {
        const db = getFirestore();
        const auth = getAuth();
        const { post } = getState();
        const user = auth.currentUser; 
  
        if (!user) {
          throw new Error('User is not authenticated');
        }
  
        const id = uuidv4(); 
        const upload = {
          id,
          uid: user.uid,
          photo: user.photoURL,
          photos: post.photos,
          username: user.displayName,
          date: serverTimestamp(),
          likes: [],
          comments: [],
          description: post.description,
        };
  
        const batch = writeBatch(db);
  
        const postRef = doc(db, 'posts', id);
        batch.set(postRef, upload);
  
        const userRef = doc(db, 'users', user.uid);
        batch.update(userRef, {
          posts: arrayUnion(id),
        });
  
        await batch.commit();
  
        // Dispatch success action
        dispatch({ type: 'UPLOAD_POST_SUCCESS', payload: upload });
      } catch (e) {
        console.error('Error uploading post:', e);
        dispatch({ type: 'UPLOAD_POST_ERROR', payload: e.message });
      }
    };
  };

export const updateDescription = (input) => {
    return {type:'UPDATE_DESCRIPTION', payload: input}
}