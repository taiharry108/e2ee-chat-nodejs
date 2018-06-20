import { UPDATE_ROOM_INFO, CLICK_POPOVER, TOGGLE_MODAL } from './types';

export const updateRoomInfo = (userNumber) => dispatch => {
  dispatch({
    type: UPDATE_ROOM_INFO,
    payload: userNumber
  })
};

export const appTitleOnClick = (isOpen) => dispatch => {
  dispatch({
    type: CLICK_POPOVER,
    payload: !isOpen
  })
}

export const toggleModal = (modal) => dispatch => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: !modal
  })
}
