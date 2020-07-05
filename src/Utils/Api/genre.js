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

const addGenre = async (title) => {
    const options = {
        'method': 'post',
        'url': `${services.GET_GENRE}`,
        'headers': {
            "Authorization": configs.AUTHORIZATION
        },
        'data': {
            'title': title,
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

const deleteGenre = async (id) => {
    const options = {
        'method': 'delete',
        'url': `${services.GET_GENRE}/${id}`,
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
    getGenre,
    getGenreById,
    addGenre,
    deleteGenre
}