import { RECEIVE_MSG, FETCH_MSGS, CONNECTED, SEND_MSG } from '../actions/types';

const initialState = {
  msgs: [],
  msg: "",
  clientId: null
}

export default function(state = initialState, action) {

  switch (action.type) {
    case RECEIVE_MSG:
      return {
        ...state,
        msgs: [...state.msgs, action.payload]
      };
    case FETCH_MSGS:
      return {
        ...state,
        msgs: action.payload
      }
    case CONNECTED:
      return {
        ...state,
        clientId: action.payload
      }
    case SEND_MSG:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state;
  }
}
