import { combineReducers } from 'redux';
import textReducer from './textReducer';
import encryptReducer from './encryptReducer';
import loginReducer from './loginReducer';
import roomReducer from './roomReducer';


export default combineReducers({
  texts: textReducer,
  encrypt: encryptReducer,
  login: loginReducer,
  room: roomReducer
});
