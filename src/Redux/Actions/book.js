import { getBook, getAuthor, getGenre, getBookById, getAuthorById,  getGenreById } from '../../Utils/Api/index';

// Get book and genre
export const setBook = (bookData, genreData) => {
    const data = {
        book: {},
        genre: []
    };
    genreData.forEach(genre => {
        data.genre[genre.id] = genre;
        data.book[genre.id] = bookData.filter(book => book.id_genre === genre.id);
    });

    data.book['all'] = bookData;

    return {
        type: 'SET_BOOK',
        payload: data
    }
}

// Get book with order or limit
export const setBookFilter = (bookData) => {
    return {
        type: 'SET_BOOK_FILTER',
        payload: bookData
    }
}

export const setAuthor = (authorData) => {
    return {
        type: 'SET_AUTHOR',
        payload: authorData
    }
}

export const setSingleBook = (book, author, genre) => {
    return {
        type: 'SET_SINGLE_BOOK',
        payload: {
            book: book,
            author: author,
            genre: genre
        }
    }
}

export const setLoading = status => {
    return {
        type: 'SET_LOADING',
        payload: status
    }
}

// fetch book from API
export const fetchBook = () => dispatch => {
    return getBook().then(book => {
        getGenre().then(genre => {
            dispatch(setBook(book.data, genre.data));
            dispatch(setLoading(false));
        })
    })
}

// fetch book from api with filter 
export const fetchBookFilter = (query) => dispatch => {
    return getBook(...query).then(book => {
        dispatch(setBookFilter(book.data));
        dispatch(setLoading(false));
    })
}

// fetch author
export const fetchAuthor = () => dispatch => {
    return getAuthor().then(author => {
        dispatch(setAuthor(author.data));
        dispatch(setLoading(false));
    }) 
}

export const fetchSingleBook = (id_book) => dispatch => {
    return getBookById(id_book).then(book => {
        getAuthorById(book.data[0].id_author).then(author => {
            getGenreById(book.data[0].id_genre).then(genre => {
                dispatch(setSingleBook(book.data[0], author.data[0], genre.data[0]));
                dispatch(setLoading(false));
            })
        })
    })
}