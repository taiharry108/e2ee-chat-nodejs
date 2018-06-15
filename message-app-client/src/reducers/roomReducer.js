import { UPDATE_ROOM_INFO, CLICK_POPOVER, TOGGLE_MODAL } from '../actions/types';

const initialState = {
  userNumber: 0,
  roomInfo: [],
  popoverOpen: false,
  modal: true
}

export default function(state = initialState, action) {

  switch (action.type) {
    case UPDATE_ROOM_INFO:
      return {
        ...state,
        userNumber: action.payload.number,
        roomInfo: action.payload.roomInfo
      };
    case CLICK_POPOVER:
      return {
        ...state,
        popoverOpen: action.payload
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload
      }
    default:
      return state;
  }
}
