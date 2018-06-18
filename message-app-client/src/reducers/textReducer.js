import { RECEIVE_MSG, FETCH_MSGS, CONNECTED, SEND_MSG, CLEAR_MSG } from '../actions/types';

const initialState = {
  msgs: [],
  msg: "",
  clientId: null,
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
    case CLEAR_MSG:
      return {
        ...state,
        msg: ''
      }
    default:
      return state;
  }
}
