import { REMOVE_DM_USER,
  SELECT_DM_USER,
  SET_DH_FOR_DM_USER,
  SET_PK_FOR_DM_USER,
  SEND_DM_MESSAGE,
  RECEIVE_DM_MESSAGE,
  SET_HASH_SECRET } from './types';
import crypto from 'crypto';

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

export const setDhForDMUser = (userid, pubKey, privateKey, myPrime) => dispatch => {
  dispatch({
    type: SET_DH_FOR_DM_USER,
    payload: {userid, pubKey, privateKey, myPrime}
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

export const receiveDMMessage = (senderUserid, receiverUserId, message, messageid, toReceiver) => dispatch => {
  dispatch({
    type: RECEIVE_DM_MESSAGE,
    payload: {senderUserid, receiverUserId, message, messageid, toReceiver}
  })
}

export const setHashedSecret = (hashedSecret, otherPartyUserid) => dispatch => {
  dispatch({
    type: SET_HASH_SECRET,
    payload: {hashedSecret, otherPartyUserid}
  })
}
