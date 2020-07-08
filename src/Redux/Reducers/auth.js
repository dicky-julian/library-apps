const initialState = {
    isLogin: false,
    isAdmin: false,
    token: '',
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'SET_LOGIN':
            return {
                ...state,
                isLogin: action.payload
            }
        case 'SET_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }
        default:
            return state
    }
} 

export default auth;