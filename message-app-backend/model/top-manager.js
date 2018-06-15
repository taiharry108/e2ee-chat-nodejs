const ChatroomManager = require('./chatroom-manager');
const uuidv1 = require('uuid/v1');

class TopManager {
  constructor(io) {
    this._cms = {'default': new ChatroomManager()};
    this._io = io;
  }

  addClientToChat(chatroomKey, client, username, pubKey) {
    if (!(chatroomKey in this._cms)) {
      let newCM = new ChatroomManager();
      this._cms[chatroomKey] = newCM;
    }
    let newCM = this._cms[chatroomKey];
    client.join(chatroomKey);
    newCM.addNewClient(client, username, pubKey);
  }

  removeClientFromChat(chatroomKey, client) {
    if (chatroomKey in this._cms) {
      let cm = this._cms[chatroomKey];
      cm.removeClient(client);
    }
  }

  sendMsg(chatroomKey, msg, client) {
    let message = {
      textContent: msg.textContent,
      senderId: client.id,
      username: client.handshake.query.username,
      _id: uuidv1()
    };
    this._io.sockets.in(chatroomKey).emit('RECEIVE_MSG', message);
  }

  broadcastAESKey(chatroomKey, encryptedAESKeys) {
    this._cms[chatroomKey].broadcastAESKey(encryptedAESKeys);
  }

  broadcastRoomInfo(io, chatroomKey) {
    let cm = this._cms[chatroomKey]
    let number = cm.getUserNumber();
    let roomInfo = cm.getRoomInfo();
    console.log('going to broadcast number', number, chatroomKey)
    io.in(chatroomKey).emit('UPDATE_ROOM_INFO', {
      number, roomInfo
    });
  }
}

module.exports = TopManager;
