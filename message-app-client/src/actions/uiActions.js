import { SIDEBAR_TOGGLE, POPOVER_SIDEBAR_SWITCH } from './types';

export const toggleSidebar = (isOut) => dispatch => {
  dispatch({
    type: SIDEBAR_TOGGLE,
    payload: !isOut
  })
};

export const flipSwitch = (allowPopover) => dispatch => {
  dispatch({
    type: POPOVER_SIDEBAR_SWITCH,
    payload: allowPopover
  })
}
