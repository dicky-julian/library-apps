import { fetchLogin, fetchRegister } from './auth';
import { getBook, getBookById } from './book';
import { getAuthor, getAuthorById } from './author';
import { getGenre, getGenreById } from './genre';
import { grantToken, revokeToken, useToken, compareValues } from './config';

export {
    fetchLogin,
    fetchRegister,
    getBook,
    getBookById,
    getAuthor,
    getAuthorById,
    getGenre,
    getGenreById,
    grantToken,
    revokeToken,
    useToken,
    compareValues
}