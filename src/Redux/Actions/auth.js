import { decodeToken } from '../../Utils/Api';

export const setToken = token => dispatch => {
    const data = decodeToken(token);
    return dispatch(setUser(data));
}

export const revokeToken = (val) => {
    return {
        type: 'REVOKE_USER',
        payload: val
    }
}

export const setUser = data => {
    let role = false;
    if (data.role === 'admin') role = true
    return {
        type: 'SET_USER',
        payload: {
            isLogin: data,
            isAdmin: role
        }
    }
}

export const setLoading = status => {
    return {
        type: 'SET_LOADING',
        payload: status
    }
}