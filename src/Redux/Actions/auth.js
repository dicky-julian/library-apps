import { useToken } from '../../Utils/Api'

let data = useToken();

export const setLogin = () => {
    if (!data) data = false;
    return {
        type: 'SET_LOGIN',
        payload: data
    }
}

export const setAdmin = () => {
    let role = false;
    if (data.role === 'admin') role = true
    
    return {
        type: 'SET_ADMIN',
        payload: role
    }
}


export const setToken = token => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}