import { combineReducers } from 'redux'

const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'UPDATE_EMAIL':
            return { ...state, email:action.payload}
        case 'UPDATE_PASSWORD':
            return { ...state, password:action.payload}
        case 'UPDATE_USERNAME':
            return { ...state, username:action.payload}
        default:
            return state
    }
}

const post = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_POST_NEXT_PHOTO':
            return { ...state, photos: action.payload }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user,
    post
})

export default rootReducer