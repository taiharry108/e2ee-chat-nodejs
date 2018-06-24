import { GENERATE_RSA_KEYS, RSA_KEY_GENERATED, GENERATE_DH, DH_GENERATED } from '../actions/types'
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
  console.log("DH generated, going to post it back")
  const type = DH_GENERATED;

  self.postMessage({type, dh, userid});
}

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case GENERATE_RSA_KEYS:
      generateKeys();
      break;
    case GENERATE_DH:
      generateDH(event.data.content);
      break;

    default:
  }
})
