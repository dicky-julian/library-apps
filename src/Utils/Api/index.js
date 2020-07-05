import { fetchLogin, fetchRegister } from './auth';
import { getBook, getBookById, deleteBook } from './book';
import { getAuthor, getAuthorById, addAuthor, updateAuthor, deleteAuthor } from './author';
import { getGenre, getGenreById, addGenre, updateGenre, deleteGenre } from './genre';
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
    updateAuthor,
    deleteAuthor,
    getGenre,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre,
    getTransaction,
    borrow,
    grantToken,
    revokeToken,
    useToken,
    compareValues
}