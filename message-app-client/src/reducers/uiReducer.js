import { SIDEBAR_TOGGLE } from '../actions/types';

const initialState = {
  sidebarOut: false,
}

export default function(state = initialState, action) {

  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarOut: action.payload
      };
    default:
      return state;
  }
}
