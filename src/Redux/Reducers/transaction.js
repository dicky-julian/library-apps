const initialState = {
    bookBorrow: '',
    bookHistory: ''
}

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOK_BORROW':
            return {
                ...state,
                bookBorrow: action.payload
            }
        case 'SET_BOOK_HISTORY':
            return {
                ...state,
                bookHistory: action.payload
            }
        default:
            return state
    }
}

export default transaction;