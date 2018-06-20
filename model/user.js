class User {
  constructor(client, clientId, username, pubKey) {
    this._client = client;
    this._clientId = clientId
    this._username = username;
    this._pubKey = pubKey;
    this._isHost = false;
  }

  removeAsHost() {
    this._client.emit('REMOVE_HOST');
    this._isHost = false;
  }

  assignAsHost() {
    this._client.emit('ASSIGN_HOST');
    this._isHost = true;
  }

  getClient() {
    return this._client;
  }

  getPubKey() {
    return this._pubKey;
  }

  getUsername() {
    return this._username;
  }

  getClientId() {
    return this._clientId;
  }

}

module.exports = User;
