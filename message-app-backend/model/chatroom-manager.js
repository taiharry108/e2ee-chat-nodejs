const User = require('./user')

class ChatroomManager {
  constructor() {
    this._users = {};
    this._hostId = null;
  }

  addNewClient(newClient, newUsername, newPubKey) {
    this.removeHost();
    let user = new User (newClient, newClient.id, newUsername, newPubKey);
    this._users[newClient.id] = user
    this.assignHost();
  }

  removeClient(client) {
    this.removeHost();

    delete this._users[client.id];
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
    for (let clientId in this._users) {
      let user = this._users[clientId];
      pubKeys[clientId] = user.getPubKey();
    }
    return pubKeys;
  }

  broadcastAESKey(encryptedAESKeys) {
    for (let clientId in this._users) {
      let client = this._users[clientId].getClient();
      let aesKey = encryptedAESKeys[clientId];
      client.emit('SEND_AES', aesKey);
    }
  }

}


module.exports = ChatroomManager;
