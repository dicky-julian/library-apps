const initialState = {
    book: '',
    bookFilter: '',
    bookSingle: '',
    genre: '',
    author: ''
}

const book = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOK':
            return {
                ...state,
                book: action.payload.book,
                genre: action.payload.genre
            }
        case 'SET_BOOK_FILTER':
            return {
                ...state,
                bookFilter: action.payload
            }
        case 'SET_SINGLE_BOOK':
            return {
                ...state,
                bookSingle: action.payload
            }
        case 'SET_AUTHOR':
            return{
                ...state,
                author: action.payload
            }
        default:
            return state
    }
}

export default book;