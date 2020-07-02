import api from './api';
import { configs, services } from '../service';

const getGenre = async() => {
    const options = {
        'method': 'get',
        'url': services.GET_GENRE,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        }
    }

    const res = await api(options);
    if (res.data) return res.data;
}

const getGenreById = async (id) => {
    const options = {
        'method': 'get',
        'url': `${services.GET_GENRE}/${id}`,
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
    getGenre,
    getGenreById
}