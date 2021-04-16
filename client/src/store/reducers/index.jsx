import { combineReducers } from 'redux';
import user from './user';
import userInfoReducer from './userInfo';

const rootReducer = combineReducers({
  user,
  userInfoReducer
});

export default rootReducer;
