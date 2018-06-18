import { SEND_MSG, RECEIVE_MSG, FETCH_MSGS, CONNECTED, CLEAR_MSG} from './types';
import axios from 'axios';
import { SERVER_URL } from '../consts'

export const sendMsg = (msg) => dispatch => {
  dispatch({
    type: SEND_MSG,
    payload: msg
  })
};

export const clearMsg = (msg) => dispatch => {
  dispatch({
    type: CLEAR_MSG,
  })
};

export const receiveMsg = (msg) => dispatch => {
  dispatch({
    type: RECEIVE_MSG,
    payload: msg
  })
};

export const fetchMsgs = () => dispatch => {
  axios.get(SERVER_URL + '/api/message')
    .then(res => {
      dispatch({
        type: FETCH_MSGS,
        payload: res.data.reverse()
      })
    });
};

export const connected = (clientId) => dispatch => {
  dispatch({
    type: CONNECTED,
    payload: clientId
  })
}
