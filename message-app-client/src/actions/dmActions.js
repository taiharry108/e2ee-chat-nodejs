import { REMOVE_DM_USER, SELECT_DM_USER } from './types';

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
