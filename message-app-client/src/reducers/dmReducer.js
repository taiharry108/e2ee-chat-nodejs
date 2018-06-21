import { REMOVE_DM_USER, SELECT_DM_USER } from '../actions/types';

const initialState = {
  dmUsers: {},
  dmUsersShow: []
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
      delete newDMUsers[userid]
      return {
        ...state,
        dmUsers: newDMUsers,
        dmUsersShow: remove_ele(state.dmUsersShow, userid)
      }
    case SELECT_DM_USER:
      if (!(userid in newDMUsers))
        newDMUsers[userid] = []
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
    default:
      return state;
  }
}
