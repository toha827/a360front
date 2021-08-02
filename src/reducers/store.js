import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authReducer } from './authReducer'
import {LessonsReducer } from './LessonsReducer'
import { reducer as formReducer } from 'redux-form'


const config = {
  key: 'primary',
  storage,
  blacklist: ['registerReducer', "form"]
}

const rootReducer = persistCombineReducers(config, {
    form: formReducer,
    authReducer,
    LessonsReducer,
})

let store = compose(applyMiddleware(thunk, logger))(createStore)(rootReducer)

persistStore(store, () => {})

export default store