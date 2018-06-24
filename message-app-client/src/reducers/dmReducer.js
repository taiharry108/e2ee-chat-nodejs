import { REMOVE_DM_USER,
  SELECT_DM_USER,
  SET_DH_FOR_DM_USER,
  SET_PK_FOR_DM_USER,
  RECEIVE_DM_MESSAGE } from '../actions/types';

const initialState = {
  dmUsers: {},
  dmUsersShow: [],
}

const add_to_back = (array, ele) => {
  let newArray = [...array];
  newArray.unshift(ele)
  return newArray;
}

const remove_ele = (array, ele) => {
  let newArray = [...array];
  let idx = newArray.indexOf(ele);
  if (idx > -1)
    newArray.splice(idx, 1);
  return newArray;
}

export default function(state = initialState, action) {
  let newDMUsers = {...state.dmUsers};
  let userid = action.payload;

  switch (action.type) {
    case REMOVE_DM_USER:
      return {
        ...state,
        dmUsers: newDMUsers,
        dmUsersShow: remove_ele(state.dmUsersShow, userid)
      }
    case SELECT_DM_USER:
      if (!(userid in newDMUsers)) {
        newDMUsers[userid] = {}
      }
      console.log("in select dm user", newDMUsers[userid])
      let newDMUsersShow = [...state.dmUsersShow]
      let idx = newDMUsersShow.indexOf(userid);
      let alreadyIn = idx !== -1;

      if (!alreadyIn) {
        if (newDMUsersShow.length === 3)
          newDMUsersShow.pop();
      } else {
        newDMUsersShow.splice(idx, 1)
      }
      newDMUsersShow.unshift(userid);
      return {
        ...state,
        dmUsers: newDMUsers,
        dmUsersShow: newDMUsersShow
      }
    case SET_DH_FOR_DM_USER:
      if (!(action.payload.userid in newDMUsers)) {
        newDMUsers[action.payload.userid] = {}
      }
      newDMUsers[action.payload.userid].myPubKey = action.payload.pubKey
      newDMUsers[action.payload.userid].myPrivateKey = action.payload.privateKey
      return {
        ...state,
        dmUsers: newDMUsers
      }
    case SET_PK_FOR_DM_USER:
      if (!(action.payload.userid in newDMUsers)) {
        newDMUsers[action.payload.userid] = {}
      }
      newDMUsers[action.payload.userid].pubKey = action.payload.pubKey
      return {
        ...state,
        dmUsers: newDMUsers
      }
    case RECEIVE_DM_MESSAGE:
      let senderUserid = action.payload.senderUserid;
      let receiverUserId = action.payload.receiverUserId;
      let message = action.payload.message;
      if (senderUserid in newDMUsers) {
        let user = newDMUsers[senderUserid]
        if (!('msg' in user))
          user['msg'] = []
        user['msg'].push(message);        
      }
    default:
      return state;
  }
}
