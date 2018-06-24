const User = require('./user')
const uuidv1 = require('uuid/v1');

class ChatroomManager {
  constructor() {
    this._users = {};
    this._hostId = null;
  }

  addNewClient(newClient, newUsername, newPubKey, userid, avaIdx) {
    this.removeHost();
    let user = new User (newClient, newUsername, newPubKey, avaIdx);
    this._users[userid] = user
    this.assignHost();
  }


  removeClient(userid) {
    this.removeHost();

    delete this._users[userid];
    this.assignHost();
  }

  removeHost() {
    if (this._hostId !== null) {
      let hostClient = this._users[this._hostId]
      hostClient.removeAsHost();
    }
  }

  assignHost() {
    let keys = Object.keys(this._users)
    let noClients = keys.length;
    if (noClients != 0) {
      let hostIdx = Math.floor(Math.random() * noClients);
      let hostId = keys[hostIdx];
      this._hostId = hostId;
      let hostClient = this._users[hostId].getClient();
      console.log(hostId, 'is assigned to be host');

      hostClient.emit('ASSIGN_HOST', this.getPubKeys());
    }
    else {
      this._hostId = null;
      console.log('no host is assigned');
    }
  }

  getPubKeys() {
    let pubKeys = {};
    for (let userid in this._users) {
      let user = this._users[userid];
      pubKeys[userid] = user.getPubKey();
    }
    return pubKeys;
  }

  broadcastAESKey(encryptedAESKeys) {
    for (let userid in this._users) {
      let client = this._users[userid].getClient();
      let aesKey = encryptedAESKeys[userid];
      client.emit('SEND_AES', aesKey);
    }
  }

  sendDHToClient(myUserid, targetUserid, myPubKey) {
    if (targetUserid in this._users) {
      let client = this._users[targetUserid].getClient();
      console.log("going to send DH_GENERATED to", targetUserid)
      client.emit('DH_GENERATED', {myUserid, targetUserid, myPubKey});
    }
  }

  sendDMMessage(senderUserid, receiverUserId, message) {
    if (receiverUserId in this._users) {
      let receiverClient = this._users[receiverUserId].getClient();
      let senderClient = this._users[senderUserid].getClient();
      console.log("going to send DM message to", receiverUserId)
      let toReceiver = false;
      let messageid = uuidv1();
      senderClient.emit('SEND_DM_MESSAGE', {senderUserid, receiverUserId, message, messageid, toReceiver});
      toReceiver = true;
      messageid = uuidv1()
      receiverClient.emit('SEND_DM_MESSAGE', {senderUserid, receiverUserId, message, messageid, toReceiver});
    }

  }

  getUserNumber() {
    return Object.keys(this._users).length;
  }

  getRoomInfo() {
    let userids = Object.keys(this._users)
    return userids.map(userid => {
      let user = this._users[userid]
      return {
      username: user.getUsername(),
      userid: userid,
      avaIdx: user.getAvaIdx()
    }});
  }
}


module.exports = ChatroomManager;
