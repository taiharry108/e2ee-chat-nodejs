import { KEY_GENERATED, ASSIGN_HOST, REMOVE_HOST, SEND_AES } from '../actions/types';

const initialState = {
  rsaKey: {},
  othersKeys: {},
  isHost: false,
  aesKey: null
}

export default function(state = initialState, action) {

  switch (action.type) {
    case KEY_GENERATED:
      return {
        ...state,
        rsaKey: action.payload
      };
    case ASSIGN_HOST:
      return {
        ...state,
        isHost: true,
        othersKeys: action.payload
      }
    case REMOVE_HOST:
      return {
        ...state,
        isHost: false,
        othersKeys: {}
      }
    case SEND_AES:
      return {
        ...state,
        aesKey: action.payload
      }
    default:
      return state;
  }
}
