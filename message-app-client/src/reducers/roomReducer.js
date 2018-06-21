import { UPDATE_ROOM_INFO,
  CLICK_POPOVER,
  TOGGLE_MODAL,
  INIT_ROOM_INFO } from '../actions/types';

const initialState = {
  roomUserIds: [],
  roomUsers: {},
  popoverOpen: false,
  modal: true
}

export default function(state = initialState, action) {
  let newRoomUsers = {...state.roomUsers};
  let newRoomUserIds = [...state.roomUserIds];
  switch (action.type) {
    case INIT_ROOM_INFO:
      let roomInfo = action.payload.roomInfo;
      roomInfo.map((user) => {
        newRoomUsers[user.userid] = user
      });
      newRoomUserIds = roomInfo.map((user) => user.userid);
      return {
        ...state,
        roomUserIds: newRoomUserIds,
        roomUsers: newRoomUsers
      }
    case UPDATE_ROOM_INFO:
      let clientJoined = action.payload.clientJoined
      let username = action.payload.username
      let userid = action.payload.userid
      if (clientJoined) {
        let user = { username, userid }
        newRoomUsers[userid] = user;
        newRoomUserIds.push(userid);
      } else {
        delete newRoomUsers[userid];
        let idx = newRoomUserIds.indexOf(userid);
        if (idx > -1)
          newRoomUserIds.splice(idx, 1);
      }
      return {
        ...state,
        roomUserIds: newRoomUserIds,
        roomUsers: newRoomUsers
      };
    case CLICK_POPOVER:
      return {
        ...state,
        popoverOpen: action.payload
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload
      }
    default:
      return state;
  }
}
