import { LOGIN } from './types';
import openSocket from 'socket.io-client';

export const login = (username, chatroomName, userid) => dispatch => {
	console.log(SERVER_URL)
  let socket = openSocket(SERVER_URL, {query: {username:username, chatroomKey:chatroomName, userid:userid}});
  dispatch({
    type: LOGIN,
    payload: { username, socket, userid }
  })
};
