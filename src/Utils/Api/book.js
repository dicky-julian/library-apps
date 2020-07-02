import api from './api';
import { configs, services } from '../service';

const getBook = async (title, order, orderType, limit) => {
    const options = {
        'method': 'get',
        'url': services.GET_BOOK,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        },
        'params': {
            'title': title || '',
            'order': order || '',
            'orderType': orderType || '',
            'limit': limit || '',
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

const getBookById = async (id) => {
    const options = {
        'method': 'get',
        'url': `${services.GET_BOOK}/${id}`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        }
    }

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
    getBook,
    getBookById
}