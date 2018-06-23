import { RSA_KEY_GENERATED, SEND_KEY, ASSIGN_HOST, REMOVE_HOST, BROADCAST_AES, SEND_AES } from './types';
import aesjs from 'aes-js';
import crypto from 'crypto';
import NodeRSA from 'node-rsa';


export const dispatchKeys = (rsaKey) => dispatch => {
  let rsaKeyObject = new NodeRSA(rsaKey);
  dispatch({
    type: RSA_KEY_GENERATED,
    payload: rsaKeyObject
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
  for (let userid in pubKeys) {
    if (pubKeys.hasOwnProperty(userid)) {
      let pubKey = pubKeys[userid];
      encryptedAES[userid] = encryptWithPubKey(pubKey, aesKey)
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

// var group = "modp14";
// var aliceDH = crypto.getDiffieHellman(group);
// var bobDH = crypto.getDiffieHellman(group);
//
// aliceDH.generateKeys();
// bobDH.generateKeys();
//
// var aliceSecret = aliceDH.computeSecret(bobDH.getPublicKey(), null, "hex");
// var bobSecret = bobDH.computeSecret(aliceDH.getPublicKey(), null, "hex");
//
// var cypher = "aes-256-ctr";
// var hash = "sha256";
// var iv = new Buffer(crypto.randomBytes(16))
// var aliceIV = iv.toString('hex').slice(0,16);
// var aliceHashedSecret = crypto.createHash(hash).update(aliceSecret).digest().slice(0, 32);
// var aliceCypher = crypto.createCipheriv(cypher, aliceHashedSecret, aliceIV);
// var aliceCypher2 = crypto.createCipheriv(cypher, aliceHashedSecret, aliceIV);
//
// var cypherText = aliceCypher.update("ABC");
// var cypherText2 = aliceCypher.update("ABC");
//
// var bobHashedSecret = crypto.createHash(hash).update(bobSecret).digest().slice(0, 32);
// var bobCypher = crypto.createDecipheriv(cypher, bobHashedSecret, aliceIV);
//
// var plainText = bobCypher.update(cypherText2).toString();
// console.log(plainText); // => "I love you"
