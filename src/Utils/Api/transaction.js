import api from './api';
import { configs, services } from '../service';

const getTransaction = async (id_user, status) => {
    const options = {
        'method': 'get',
        'url': `${services.GET_TRANSACTION}/getbyuser`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        },
        'params': {
            'id_user': id_user || '',
            'status': status || ''
        }
    }

    const res = await api(options)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data.message
        })
    return res;
}

const borrow = async (id_user, id_book) => {
    const options = {
        'method': 'post',
        'url': `${services.GET_TRANSACTION}/borrow`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        },
        'data': {
            'id_user': id_user,
            'id_book': id_book
        }
    };

    const res = await api(options)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err.response
        })
    return res;
}

const returnBook = async (id_book) => {
    const options = {
        'method': 'put',
        'url': `${services.GET_TRANSACTION}/borrow`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        },
        'data': {
            'id_book': id_book
        }
    };

    const res = await api(options)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err.response
        })
    return res;
}

export {
    getTransaction,
    borrow,
    returnBook
}