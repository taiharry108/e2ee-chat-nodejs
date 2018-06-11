import { combineReducers } from 'redux';
import textReducer from './textReducer';
import encryptReducer from './encryptReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  texts: textReducer,
  encrypt: encryptReducer,
  login: loginReducer
});
