import { fetchLogin, fetchRegister } from './auth';
import { getBook, getBookById, addBook, updateBook, deleteBook } from './book';
import { getAuthor, getAuthorById, addAuthor, updateAuthor, deleteAuthor } from './author';
import { getGenre, getGenreById, addGenre, updateGenre, deleteGenre } from './genre';
import { getTransaction, borrow, returnBook } from './transaction';
import { grantToken, revokeToken, useToken, compareValues } from './config';

export {
    fetchLogin,
    fetchRegister,
    getBook,
    getBookById,
    addBook,
    updateBook,
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
    returnBook,
    grantToken,
    revokeToken,
    useToken,
    compareValues
}