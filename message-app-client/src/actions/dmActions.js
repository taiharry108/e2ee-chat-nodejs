import { REMOVE_DM_USER,
  SELECT_DM_USER,
  SET_DH_FOR_DM_USER,
  SET_PK_FOR_DM_USER,
  SEND_DM_MESSAGE } from './types';

export const removeDMUser = (userid) => dispatch => {
  dispatch({
    type: REMOVE_DM_USER,
    payload: userid
  })
};

export const selectDMUser = (userid) => dispatch => {
  dispatch({
    type: SELECT_DM_USER,
    payload: userid
  })
};

export const setDhForDMUser = (userid, pubKey, privateKey) => dispatch => {
  dispatch({
    type: SET_DH_FOR_DM_USER,
    payload: {userid, pubKey, privateKey}
  })
}

export const setPubKeyForDMUser = (userid, pubKey) => dispatch => {
  dispatch({
    type: SET_PK_FOR_DM_USER,
    payload: {userid, pubKey}
  })
}

export const sendDMMessage = (senderUserid, receiverUserId, message, socket) => {
  socket.emit(SEND_DM_MESSAGE, {senderUserid, receiverUserId, message})
}
