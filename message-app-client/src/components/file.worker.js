const crypto = require('crypto');
self.addEventListener('message', (event) => {
  console.log('generating keys');
  let t1 = performance.now();
  let group = 'modp14';
  const dh = crypto.getDiffieHellman(group);
  dh.generateKeys();
  let t2 = performance.now();

  self.postMessage({time: t2-t1, key: dh})
})