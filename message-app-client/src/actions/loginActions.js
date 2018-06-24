import { LOGIN } from './types';
import openSocket from 'socket.io-client';

export const login = (username, chatroomName, userid, avaIdx) => dispatch => {
	console.log(SERVER_URL)
  let socket = openSocket(SERVER_URL, {query: {username:username, chatroomKey:chatroomName, userid:userid, avaIdx:avaIdx}});
  dispatch({
    type: LOGIN,
    payload: { username, socket, userid }
  })
};
