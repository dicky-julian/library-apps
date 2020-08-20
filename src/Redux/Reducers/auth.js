const initialState = {
    isLogin: false,
    isAdmin: false,
    isLogout: false,
    isLoading: true
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isLogin: action.payload.isLogin,
                isAdmin: action.payload.isAdmin
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'REVOKE_USER':
            return {
                ...state,
                isLogin: false,
                isAdmin: false,
                isLogout: action.payload
            }
        default:
            return state
    }
}

export default auth;