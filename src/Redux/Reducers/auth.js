const initialState = {
    isLogin: false,
    isAdmin: false,
    isLogout: false,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                isLogin: action.payload.isLogin,
                isAdmin: action.payload.isAdmin
            }
        case 'REVOKE_USER':
            return {
                isLogin: false,
                isAdmin: false,
                isLogout: action.payload
            }
        default:
            return state
    }
} 

export default auth;