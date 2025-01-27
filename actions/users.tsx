import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';

export const updateEmail = (input) => {
	return {type:'UPDATE_EMAIL', payload: input}
}
export const updatePassword = (input) => {
	return {type:'UPDATE_PASSWORD', payload: input}
}

export const updateUsername = (input) => {
    return {type:'UPDATE_USERNAME', payload: input.toLowerCase().replace(' ','_')}
}

export const signup = () => {
    return async (dispatch,getState) => {
        try {
            const {username,email,password} = getState().user

            const response = await createUserWithEmailAndPassword(auth, email, password);
        
            if(response.user.uid){
                
                await updateProfile(response.user,{displayName:username})

                const user = {
                    username:username,
                    email:email,
                    posts: [],
                    bio: '',
                    likes: 0,
                    photo:'',
                    password:password
                }
                await setDoc(doc(db, 'users', response.user.uid), user);
                dispatch({type:'LOGIN',payload: user})
                alert('User has been signed up!')
            }
        }catch(e){
            alert(e)
        }
    }
}

export const login = () => {
    return async (dispatch,getState) => {
        try {
            const {email,password} = getState().user
            const response = await signInWithEmailAndPassword(auth,email,password)

            dispatch({type:'LOGIN', payload: response.user.uid}) // retrives the unique id of the user
            alert('Login successful!');
        }catch(e){
            alert(e)
        }
    }
}

export const getUser = (uid) => {
    return async (dispatch) => {
      try {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (!userDoc.exists()) {
          throw new Error('User not found');
        }
  
        const user = userDoc.data();
  
        // Fetch user's posts
        const postsQuery = query(collection(db, 'posts'), where('uid', '==', uid));
        const postSnapshots = await getDocs(postsQuery);
  
        const posts = [];
        postSnapshots.forEach((doc) => posts.push(doc.data()));
  
        // Order posts by date in descending order
        user.posts = orderBy(posts, 'date', 'desc');
  
        // Dispatch user data to Redux store
        dispatch({ type: 'LOGIN', payload: user });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
};