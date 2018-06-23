import { GENERATE_RSA_KEYS, RSA_KEY_GENERATED } from '../actions/types'
import crypto from 'crypto';
import NodeRSA from 'node-rsa';

const generate_keys = () => {
  let rsaKey = new NodeRSA({b: RSA_KEY_SIZE});
  rsaKey = rsaKey.exportKey('pkcs8-private-pem');
  const type = RSA_KEY_GENERATED;
  self.postMessage({type, rsaKey});
}

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case GENERATE_RSA_KEYS:
      generate_keys();
      break;
    default:
  }
})
