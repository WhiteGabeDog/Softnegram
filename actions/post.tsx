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

export const updateDescription = (input) => {
    return {type:'UPDATE_DESCRIPTION', payload: input}
}