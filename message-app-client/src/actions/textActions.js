import { SEND_MSG, RECEIVE_MSG, FETCH_MSGS, CONNECTED } from './types';
import axios from 'axios';
import { SERVER_URL } from '../consts'

export const sendMsg = (socket, msg) => dispatch => {
  socket.emit(SEND_MSG, msg);
};

export const receiveMsg = (msg) => dispatch => {
  console.log(msg);
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
