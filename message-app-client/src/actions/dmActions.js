import { REMOVE_DM_USER, SELECT_DM_USER } from './types';

export const removeDMUser = (dmUser) => dispatch => {
  dispatch({
    type: REMOVE_DM_USER,
    payload: dmUser
  })
};

export const selectDMUser = (dmUser) => dispatch => {
  dispatch({
    type: SELECT_DM_USER,
    payload: dmUser
  })
};
