import { REMOVE_DM_USER,
  SELECT_DM_USER,
  SET_DH_FOR_DM_USER,
  SET_PK_FOR_DM_USER,
  RECEIVE_DM_MESSAGE,
  SET_HASH_SECRET } from '../actions/types';

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
      newDMUsers[action.payload.userid].myPrime = action.payload.myPrime
      return {
        ...state,
        dmUsers: newDMUsers
      }
    case SET_PK_FOR_DM_USER:
      if (!(action.payload.userid in newDMUsers)) {
        newDMUsers[action.payload.userid] = {}
      }
      let pubKeyMap = action.payload.pubKey;
      newDMUsers[action.payload.userid].pubKey = new Uint8Array(Object.keys(pubKeyMap).map((k) => pubKeyMap[k]))
      return {
        ...state,
        dmUsers: newDMUsers
      }
    case RECEIVE_DM_MESSAGE:
      let senderUserid = action.payload.senderUserid;
      let receiverUserId = action.payload.receiverUserId;
      let message = action.payload.message;
      let messageid = action.payload.messageid;
      let toReceiver = action.payload.toReceiver
      let targetUserid = toReceiver ? senderUserid : receiverUserId;
      if (targetUserid in newDMUsers) {
        let user = newDMUsers[targetUserid]
        if (!('msg' in user))
          user['msg'] = [];
        user['msg'].push({senderUserid, receiverUserId, message, messageid, toReceiver});
      }
      return {
        ...state,
        dmUsers: newDMUsers
      }
    case SET_HASH_SECRET:
      let hashedSecret = action.payload.hashedSecret;
      let otherPartyUserid = action.payload.otherPartyUserid;
      newDMUsers[otherPartyUserid].hashedSecret = hashedSecret
      return {
        ...state,
        dmUsers: newDMUsers
      }
    default:
      return state;
  }
}
