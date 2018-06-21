import { LOGIN } from './types';
import openSocket from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || "http://chanss.asuscomm.com:60888";


export const login = (username, chatroomName, userid) => dispatch => {
	console.log(SERVER_URL)
  let socket = openSocket(SERVER_URL, {query: {username:username, chatroomKey:chatroomName, userid:userid}});
  dispatch({
    type: LOGIN,
    payload: { username, socket, userid }
  })
};
