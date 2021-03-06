import { combineReducers } from 'redux';
import textReducer from './textReducer';
import encryptReducer from './encryptReducer';
import loginReducer from './loginReducer';
import roomReducer from './roomReducer';
import uiReducer from './uiReducer';
import dmReducer from './dmReducer';

export default combineReducers({
  texts: textReducer,
  encrypt: encryptReducer,
  login: loginReducer,
  room: roomReducer,
  ui: uiReducer,
  dm: dmReducer
});
