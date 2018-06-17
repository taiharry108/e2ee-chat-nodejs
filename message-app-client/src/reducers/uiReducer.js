import { SIDEBAR_TOGGLE, POPOVER_SIDEBAR_SWITCH } from '../actions/types';

const initialState = {
  sidebarOut: false,
  allowPopover: true
}

export default function(state = initialState, action) {

  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarOut: action.payload
      };
    case POPOVER_SIDEBAR_SWITCH:
      return {
        ...state,
        allowPopover: action.payload
      }
    default:
      return state;
  }
}
