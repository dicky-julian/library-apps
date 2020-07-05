import api from './api';
import { services } from '../service';

const fetchLogin = async (uname, pass) => {
    const options = {
        'method': 'post',
        'url': services.FETCH_LOGIN,
        'data': {
            'username': uname,
            'password': pass
        }
    };

    const res = await api(options)
        .then(res => {
            const data = res.data.data;
            return data;
        })
        .catch(err => {
            return err.response;
        });
    if (res) return res;
}

const fetchRegister = async (fullname, uname, pass) => {
    const options = {
        'method': 'post',
        'url': services.FETCH_REGISTER,
        'data': {
            'fullname': fullname,
            'username': uname,
            'password': pass,
            'role': 'member'
        }
    };

    const res = await api(options)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err.response;
        })
    return res;
}

export {
    fetchLogin,
    fetchRegister
}