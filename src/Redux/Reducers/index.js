import { combineReducers } from 'redux';
import auth from './auth';
import book from './book';
import transaction from './transaction';
import config from './config';

export default combineReducers({ auth, book, transaction, config });