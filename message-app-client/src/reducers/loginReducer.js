import { LOGIN } from '../actions/types';

const initialState = {
  username: '',
  userid: null,
  socket: null,
}

export default function(state = initialState, action) {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        socket: action.payload.socket,
        userid: action.payload.userid
      };
    default:
      return state;
  }
}
