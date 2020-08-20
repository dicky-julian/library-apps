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

export const setLoading = status => {
    return {
        type: 'SET_LOADING',
        payload: status
    }
}

export const fetchUserBook = id => dispatch => {
    return getTransaction(id, 1).then(bookBorrow => {
        getTransaction(id, 2).then(bookHistory => {
            if (typeof (bookBorrow) === 'string') {
                dispatch(setBookBorrow([]))
            } else {
                dispatch(setBookBorrow(bookBorrow.data))
            }

            if (typeof (bookHistory) === 'string') {
                dispatch(setBookHistory([]))
            } else {
                dispatch(setBookHistory(bookHistory.data))
            }

            dispatch(setLoading(false));
        })
    })
}