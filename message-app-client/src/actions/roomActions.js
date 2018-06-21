import { UPDATE_ROOM_INFO,
  CLICK_POPOVER,
  TOGGLE_MODAL,
  INIT_ROOM_INFO } from './types';

export const updateRoomInfo = (roomInfo) => dispatch => {
  dispatch({
    type: UPDATE_ROOM_INFO,
    payload: roomInfo
  })
};

export const receiveInitRoomInfo = (initRoomInfo) => dispatch => {
  dispatch({
    type: INIT_ROOM_INFO,
    payload: initRoomInfo
  })
}

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
