import { KEY_GENERATED, SEND_KEY, ASSIGN_HOST, REMOVE_HOST, BROADCAST_AES, SEND_AES } from './types';
import crypto from 'crypto';
import aesjs from 'aes-js';
import NodeRSA from 'node-rsa';

export const genKeys = () => dispatch => {
  const rsaKey = new NodeRSA({b: 512});
  dispatch({
    type: KEY_GENERATED,
    payload: rsaKey
  })
}

export const sendPubKey2Ser = (socket, pubKey) => {
  socket.emit(SEND_KEY, pubKey)
}

export const assignedAsHost = (pubKeys, socket) => dispatch => {
  dispatch({
    type: ASSIGN_HOST,
    payload: pubKeys
  })

  let aesKey = crypto.randomBytes(32);

  let encryptedAES = {};
  for (let clientId in pubKeys) {
    if (pubKeys.hasOwnProperty(clientId)) {
      let pubKey = pubKeys[clientId];
      encryptedAES[clientId] = encryptWithPubKey(pubKey, aesKey)
      console.log('going to send encrypted aes', encryptedAES[clientId])
    }
  }

  socket.emit(BROADCAST_AES, encryptedAES);
}

export const receivedEncryptedAESKey = (encryptedAES, rsaKey) => dispatch => {
  dispatch({
    type: SEND_AES,
    payload: rsaKey.decrypt(encryptedAES, 'buffer')
  });
}

const encryptWithPubKey = (pubKey, msg) => {
  let key = new NodeRSA(pubKey);
  return key.encrypt(msg, 'base64');
}

export const removeAsHost = () => dispatch => {
  dispatch({
    type: REMOVE_HOST
  })
}

export const encrypt = (msg, aesKey) => {
  var msgBytes = aesjs.utils.utf8.toBytes(msg);
  var aesCtrEncrypter = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  var encryptedBytes = aesCtrEncrypter.encrypt(msgBytes);
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export const decrypt = (encryptedHex, aesKey) => {
  var aesCtrDecrypter = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  var decryptedBytes = aesCtrDecrypter.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}
