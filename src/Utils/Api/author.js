import api from './api';
import { configs, services } from '../service';

const getAuthor = async () => {
    const options = {
        'method': 'get',
        'url': services.GET_AUTHOR,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        }
    }

    const res = await api(options)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response
        })
    return res;
}

const getAuthorById = async (id) => {
    const options = {
        'method': 'get',
        'url': `${services.GET_AUTHOR}/${id}`,
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
    getAuthor,
    getAuthorById
}