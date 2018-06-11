import { LOGIN } from './types';
import openSocket from 'socket.io-client';
import { SERVER_URL } from '../consts'


export const login = (username, chatroomName) => dispatch => {
  let socket = openSocket(SERVER_URL, {query: {username:username, chatroomKey:chatroomName}});
  dispatch({
    type: LOGIN,
    payload: { username, socket }
  })
};
