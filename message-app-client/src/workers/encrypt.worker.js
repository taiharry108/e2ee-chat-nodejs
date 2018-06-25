import { GENERATE_RSA_KEYS,
  RSA_KEY_GENERATED,
  GENERATE_DH,
  DH_GENERATED,
  SECRET_COMPUTED,
  COMPUTE_SECRET } from '../actions/types'
import crypto from 'crypto';
import NodeRSA from 'node-rsa';

const generateKeys = () => {
  console.log("going to generate rsa keys")
  let rsaKey = new NodeRSA({b: RSA_KEY_SIZE});
  rsaKey = rsaKey.exportKey('pkcs8-private-pem');
  const type = RSA_KEY_GENERATED;
  console.log("keys generated, going to post it back")
  self.postMessage({type, rsaKey});
}

const generateDH = (userid) => {
  console.log('going to gen DH for ', userid)
  let group = "modp14";
  let dh = crypto.getDiffieHellman(group);
  dh.generateKeys();
  let pubKey = dh.getPublicKey();
  let privateKey = dh.getPrivateKey();
  let prime = dh.getPrime();
  console.log("DH generated, going to post it back")
  const type = DH_GENERATED;

  self.postMessage({type, userid, dh, pubKey, privateKey, prime});
}

export const computeSecretFromPrivatePublic = (myPrivateKey, otherPartyPubKey, otherPartyUserid, myPrime) => {
  const dh = crypto.createDiffieHellman(myPrime);
  console.log('going to generate keys for dh for setting private key');
  dh.generateKeys();
  dh.setPrivateKey(myPrivateKey);
  const secret = dh.computeSecret(otherPartyPubKey);
  const hash = "sha256";
  const hashedSecret = crypto.createHash(hash).update(secret).digest().slice(0, 32);
  self.postMessage({type: SECRET_COMPUTED, hashedSecret:hashedSecret, otherPartyUserid:otherPartyUserid})
}



self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case GENERATE_RSA_KEYS:
      generateKeys();
      break;
    case GENERATE_DH:
      generateDH(event.data.content);
      break;
    case COMPUTE_SECRET:
      const myPrivateKey = event.data.myPrivateKey;
      const otherPartyPubKey = event.data.otherPartyPubKey;
      const otherPartyUserid = event.data.otherPartyUserid;
      const myPrime = event.data.myPrime;
      computeSecretFromPrivatePublic(myPrivateKey, otherPartyPubKey, otherPartyUserid, myPrime);
    default:
  }
})
