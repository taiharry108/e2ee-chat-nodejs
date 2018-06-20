import { LOGIN } from './types';
import openSocket from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || "/";


export const login = (username, chatroomName) => dispatch => {
	console.log(SERVER_URL)
  let socket = openSocket(SERVER_URL, {query: {username:username, chatroomKey:chatroomName}});
  dispatch({
    type: LOGIN,
    payload: { username, socket }
  })
};
