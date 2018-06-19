import { SIDEBAR_TOGGLE,
  POPOVER_SIDEBAR_SWITCH,
  APPEND_EMOJI,
  CLEAR_EMOJI,
  EMOJI_CLICKED,
  TOGGLE_ALLOW_AUTO_BOTTOM,
} from './types';

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

export const appendEmoji = (emoji) => dispatch => {
  dispatch({
    type: APPEND_EMOJI,
    payload: emoji
  })
}

export const clearEmoji = (emoji) => dispatch => {
  dispatch({
    type: CLEAR_EMOJI,
  })
}

export const emojiClicked = (emojiPaneOut) => dispatch => {
  dispatch({
    type: EMOJI_CLICKED,
    payload: !emojiPaneOut
  })
};

export const toggleAllowAutoBottom = (allow) => dispatch => {
  dispatch({
    type: TOGGLE_ALLOW_AUTO_BOTTOM,
    payload: allow
  })
}
