import { RSA_KEY_GENERATED,
  SEND_KEY,
  ASSIGN_HOST,
  REMOVE_HOST,
  BROADCAST_AES,
  SEND_AES } from './types';
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
  const msgBytes = aesjs.utils.utf8.toBytes(msg);
  const aesCtrEncrypter = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  const encryptedBytes = aesCtrEncrypter.encrypt(msgBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export const decrypt = (encryptedHex, aesKey) => {
  const aesCtrDecrypter = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  const decryptedBytes = aesCtrDecrypter.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}

export const dmEncrypt = (msg, hashedSecret) => {
  const cypherType = "aes-256-ctr";
  let iv = new Buffer(crypto.randomBytes(16))
  iv = iv.toString('hex').slice(0,16);
  const cypher = crypto.createCipheriv(cypherType, hashedSecret, iv);
  const cypherText = cypher.update(msg).toString('hex');
  return iv + cypherText;
}

export const dmDecrypt = (encryptedMsg, hashedSecret) => {
  const cypherType = "aes-256-ctr";
  const iv = encryptedMsg.slice(0, 16)
  const cypherText = encryptedMsg.slice(16)
  const decypher = crypto.createDecipheriv(cypherType, hashedSecret, iv);
  return decypher.update(new Buffer(cypherText, "hex")).toString();
}


// var crypto = require('crypto');
// var group = "modp14";
// var aliceDH = crypto.getDiffieHellman(group);
// var aliceDH2 = crypto.createDiffieHellman(crypto.getDiffieHellman(group).getPrime());
// // var bobDH = crypto.createDiffieHellman(aliceDH.getPrime());
// var bobDH = crypto.getDiffieHellman(group);
//
// aliceDH.generateKeys();
// aliceDH2.generateKeys();
// bobDH.generateKeys();
//
//
//
// aliceDH2.getPublicKey()
// aliceDH2.setPrivateKey(aliceDH.getPrivateKey());
// aliceDH2.getPublicKey()
//
// var aliceSecret = aliceDH.computeSecret(bobDH.getPublicKey());
// var aliceSecret2 = aliceDH2.computeSecret(bobDH.getPublicKey());
// aliceSecret
// aliceSecret2
// var bobSecret = bobDH.computeSecret(aliceDH.getPublicKey());
//
// var cypher = "aes-256-ctr";
// var hash = "sha256";
// var iv = new Buffer(crypto.randomBytes(16))
// var aliceIV = iv.toString('hex').slice(0,16);
// var aliceHashedSecret = crypto.createHash(hash).update(aliceSecret).digest().slice(0, 32);
// var aliceCypher = crypto.createCipheriv(cypher, aliceHashedSecret, aliceIV);
// var cypherText = aliceCypher.update("ABC").toString('hex');
//
// var bobHashedSecret = crypto.createHash(hash).update(bobSecret).digest().slice(0, 32);
// var bobCypher = crypto.createDecipheriv(cypher, bobHashedSecret, aliceIV);
//
// var plainText = bobCypher.update(new Buffer(cypherText, "hex")).toString();
// console.log(plainText);
