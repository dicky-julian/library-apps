import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './Reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistreducer = persistReducer(persistConfig, reducer);
const store = createStore(
    persistreducer,
    applyMiddleware(thunk)
);

const persiststore = persistStore(store);

export default { store, persiststore };