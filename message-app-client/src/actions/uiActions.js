import { SIDEBAR_TOGGLE } from './types';

export const toggleSidebar = (isOut) => dispatch => {
  dispatch({
    type: SIDEBAR_TOGGLE,
    payload: !isOut
  })
};
