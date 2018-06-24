import { REMOVE_DM_USER, SELECT_DM_USER, SET_DH_FOR_DM_USER, SET_PK_FOR_DM_USER } from './types';

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

export const setDhForDMUser = (userid, dh) => dispatch => {
  dispatch({
    type: SET_DH_FOR_DM_USER,
    payload: {userid, dh}
  })
}

export const setPubKeyForDMUser = (userid, pubKey) => dispatch => {
  dispatch({
    type: SET_PK_FOR_DM_USER,
    paylaod: {userid, pubKey}
  })
}
