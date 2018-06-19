import { SIDEBAR_TOGGLE,
  POPOVER_SIDEBAR_SWITCH,
  APPEND_EMOJI,
  CLEAR_EMOJI,
  EMOJI_CLICKED,
  TOGGLE_ALLOW_AUTO_BOTTOM,
} from '../actions/types';

const initialState = {
  sidebarOut: false,
  allowPopover: true,
  emoji: null,
  emojiPaneOut: false,
  allowAutoBottom: true,
}

export default function(state = initialState, action) {

  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarOut: action.payload
      };
    case POPOVER_SIDEBAR_SWITCH:
      return {
        ...state,
        allowPopover: action.payload
      }
    case APPEND_EMOJI:
      return {
        ...state,
        emoji: action.payload
      }
    case CLEAR_EMOJI:
      return {
        ...state,
        emoji: null
      }
    case EMOJI_CLICKED:
      return {
        ...state,
        emojiPaneOut: action.payload
      };
    case TOGGLE_ALLOW_AUTO_BOTTOM:
      return {
        ...state,
        allowAutoBottom: action.payload
      }
    default:
      return state;
  }
}
