import { LOGIN } from '../actions/types';

const initialState = {
  username: '',
  socket: null,
}

export default function(state = initialState, action) {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        socket: action.payload.socket
      };
    default:
      return state;
  }
}
