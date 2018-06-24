import { RSA_KEY_GENERATED, ASSIGN_HOST, REMOVE_HOST, SEND_AES } from '../actions/types';
import Worker from '../workers/encrypt.worker.js';

const initialState = {
  rsaKey: null,
  othersKeys: {},
  isHost: false,
  aesKey: null,
  // worker: new Worker()
}

export default function(state = initialState, action) {

  switch (action.type) {
    case RSA_KEY_GENERATED:
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
