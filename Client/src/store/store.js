import { createStore, combineReducers } from 'redux'
import HomeReducer from '../modules/Home/reducer-home'
import notifyReducer from '../modules/Notify/reducer-notify'

const reducers = combineReducers({
    home: HomeReducer,
    notify: notifyReducer
});

const store = createStore(reducers);
export default store