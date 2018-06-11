import { LOGIN } from './types';
import openSocket from 'socket.io-client';

export const login = (username, chatroomName) => dispatch => {
  let socket = openSocket('http://localhost:8000', {query: {username:username, chatroomKey:chatroomName}});
  dispatch({
    type: LOGIN,
    payload: { username, socket }
  })
};
