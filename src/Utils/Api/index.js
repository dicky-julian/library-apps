import { fetchLogin, fetchRegister } from './auth';
import { getBook, getBookById, deleteBook } from './book';
import { getAuthor, getAuthorById, addAuthor, deleteAuthor } from './author';
import { getGenre, getGenreById, addGenre, deleteGenre } from './genre';
import { getTransaction, borrow } from './transaction';
import { grantToken, revokeToken, useToken, compareValues } from './config';

export {
    fetchLogin,
    fetchRegister,
    getBook,
    getBookById,
    deleteBook,
    getAuthor,
    getAuthorById,
    addAuthor,
    deleteAuthor,
    getGenre,
    getGenreById,
    addGenre,
    deleteGenre,
    getTransaction,
    borrow,
    grantToken,
    revokeToken,
    useToken,
    compareValues
}