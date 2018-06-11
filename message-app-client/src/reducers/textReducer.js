import { RECEIVE_MSG, FETCH_MSGS, CONNECTED } from '../actions/types';

const initialState = {
  msgs: [],
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
    default:
      return state;
  }
}
