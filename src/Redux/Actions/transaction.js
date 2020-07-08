import { getTransaction } from '../../Utils/Api/index';

export const setBookBorrow = (data) => {
    return {
        type: 'SET_BOOK_BORROW',
        payload: data
    }
}

export const setBookHistory = (data) => {
    return {
        type: 'SET_BOOK_HISTORY',
        payload: data
    }
}

export const fetchUserBook = id => dispatch => {
    return getTransaction(id, 1).then(bookBorrow => {
        getTransaction(id, 2).then(bookHistory => {
            dispatch(setBookBorrow(bookBorrow.data));
            dispatch(setBookHistory(bookHistory.data))
        })
    })
}