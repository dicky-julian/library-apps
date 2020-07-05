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

const addBook = async (data) => {
    const body = new FormData();
    const image = data.image;
    delete data.image;

    for (var key in data) {
        body.set(key, data[key]);
    }

    body.append('image', image);
    const options = {
        'method': 'post',
        'url': `${services.GET_BOOK}`,
        'data': body,
        'headers': {
            "Authorization": configs.AUTHORIZATION,
            "Content-Type": "multipart/form-data"
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

const updateBook = async (data, id) => {
    const body = new FormData();
    const image = data.image;
    delete data.image;

    for (var key in data) {
        body.set(key, data[key]);
    }

    body.append('image', image);
    const options = {
        'method': 'put',
        'url': `${services.GET_BOOK}/${id}`,
        'data': body,
        'headers': {
            "Authorization": configs.AUTHORIZATION,
            "Content-Type": "multipart/form-data"
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

const deleteBook = async (id) => {
    const options = {
        'method': 'delete',
        'url': `${services.GET_BOOK}/${id}`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        }
    }

    const res = await api(options)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err.response)
            return err.response
        })
    return res;
}

export {
    getBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}