import { ADD_DM_USER, REMOVE_DM_USER } from '../actions/types';

const initialState = {
  dmUsers: [],
}

export default function(state = initialState, action) {

  switch (action.type) {
    case ADD_DM_USER:
      return {
        ...state,
        dmUsers: [...state.dmUsers, action.payload]
      }
    default:
      return state;
  }
}
