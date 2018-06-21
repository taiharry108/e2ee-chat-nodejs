const ChatroomManager = require('./chatroom-manager');
const uuidv1 = require('uuid/v1');

class TopManager {
  constructor(io) {
    this._cms = {'default': new ChatroomManager()};
    this._io = io;
  }

  addClientToChat(chatroomKey, client, username, pubKey, userid) {
    if (!(chatroomKey in this._cms)) {
      let newCM = new ChatroomManager();
      this._cms[chatroomKey] = newCM;
    }
    let newCM = this._cms[chatroomKey];
    client.join(chatroomKey);
    newCM.addNewClient(client, username, pubKey, userid);
  }

  removeClientFromChat(chatroomKey, userid) {
    if (chatroomKey in this._cms) {
      let cm = this._cms[chatroomKey];
      cm.removeClient(userid);
    }
  }

  sendMsg(chatroomKey, msg, client) {
    let message = {
      textContent: msg.textContent,
      senderId: client.handshake.query.userid,
      username: client.handshake.query.username,
      _id: uuidv1()
    };
    this._io.sockets.in(chatroomKey).emit('RECEIVE_MSG', message);
  }

  broadcastAESKey(chatroomKey, encryptedAESKeys) {
    this._cms[chatroomKey].broadcastAESKey(encryptedAESKeys);
  }

  sendRoomInfoToClient(client, chatroomKey, userid) {
    let cm = this._cms[chatroomKey]
    let roomInfo = cm.getRoomInfo();
    let number = roomInfo.length;
    console.log('going to send info to client', userid,' number', number, chatroomKey)
    client.emit('INIT_ROOM_INFO', {
      roomInfo
    })
  }

  updateRoomInfoToOtherClients(client, chatroomKey, userid, clientJoined, username) {
    client.to(chatroomKey).emit('UPDATE_ROOM_INFO', { userid, username, clientJoined });
  }
}

module.exports = TopManager;
