import configureStore from './store/configureStore'
import * as actions from './actions'
import request from 'request'
import fastSha256 from 'fast-sha256'
import ethUtil from 'ethereumjs-util'
import Tx from 'ethereumjs-tx'

export var store = configureStore();

let unsubscribe = store.subscribe(() => {
  var state = store.getState();
  if (state.entropy) {
    _generate(state.entropy);
    return;
  }
  
});


function entropyToSeed(entropy) {
    if (typeof(entropy) !== 'string' || entropy.length !== 30) {
        throw new Error('entropy must be a string of length 30');
    }

    entropy = new Buffer(entropy);

    var rv = new Buffer(fastSha256(entropy));
    return rv;
}

function _generate(entropy) {
  var seed = entropyToSeed(entropy);
  if (!Buffer.isBuffer(seed)) {
    throw new Error('seed must be a buffer');
  }

  var hexSeed = seed.toString('hex');
  var address = '0x' + ethUtil.privateToAddress(seed).toString('hex');
  store.dispatch(actions.generateSuccess(hexSeed, address));
}

export function generate(entropy) {
  store.dispatch(actions.generate(entropy));
}

  // var iframe = document.createElement('iframe');
  // iframe.src = path;
  // iframe.style.display = 'none';
  // document.body.appendChild(iframe);
export function encrypt(password, workerUrl, iframe, window) {
  store.dispatch(actions.encrypt(password, workerUrl));
  var path = workerUrl + encodeURIComponent( location.origin );
  pathArray = path.split( '/' );

  window.addEventListener('message', function(evt) {
    if (evt.origin !== pathArray[0] + '//' + pathArray[2]) {
      //ignoring
      return;
    }
    if (!evt.data || evt.data.action == 'error') {
      store.dispatch(actions.encryptError(evt.data.error));
      return;
    }
    var data = evt.data;
    if (data.action === 'loaded') {
      console.log('worker loaded, starting export ...');

      iframe.contentWindow.postMessage({
        action: "export",
        hexSeed: hexSeed,
        password: password,
        randomBytes: crypto.getRandomValues(new Uint8Array(64))
      }, '*');
    } else if (data.action === 'progress') {
      console.log(parseInt(data.percent) + '%');
    } else if (data.action === 'exported') {
      console.log('exported');
      store.dispatch(actions.encryptSuccess(data.json));
    } else {
      console.log('uknown event' + data.action);
      console.dir(data)
    }
  }, false);
}

  // var iframe = document.createElement('iframe');
  // iframe.src = path;
  // iframe.style.display = 'none';
  // document.body.appendChild(iframe);
export function decrypt(password, workerUrl, iframe, window) {
  store.dispatch(actions.decrypt(password, workerUrl));

  var path = workerUrl + encodeURIComponent( location.origin );
  pathArray = path.split( '/' );


  window.addEventListener('message', function(evt) {
    if (evt.origin !== pathArray[0] + '//' + pathArray[2]) {
      //ignoring
      return;
    }
    if (!evt.data || evt.data.action == 'error') {
      console.log('error');
      store.dispatch(actions.decryptError(evt.data.error));
      return;
    }
    var data = evt.data;
    if (data.action === 'loaded') {
      console.log('worker loaded, starting import ...');
      iframe.contentWindow.postMessage({
          action: 'import',
          json: json,
          password: password,
      }, '*');
    } else if (data.action === 'progress') {
      console.log(parseInt(data.percent) + '%');
    } else if (data.action === 'imported') {
      if (data.hexSeed === null) {
        console.log('Message Authentication Code mismatch (wrong password)')
      } else {
        store.dispatch(actions.decryptSuccess(data.hexSeed));
      }
    }  else {
      console.log('uknown event' + data.action);
      console.dir(data)
    }
  }, false);
}


export function save(storageToken, storageUrl) {
  store.dispatch(actions.save(storageToken, storageUrl));

  let state = store.getState();

  let encrypted = state.encrypted;
  let address = state.address;

  request({
    url: storageUrl,
    method: "POST",
    json: true,
    body: {
      storageToken: storageToken,
      encrypted: encrypted,
      address: address
    }
  }, function (error, response, body){
    if (error) {
      store.dispatch(actions.storageError(error));
    } else {
      store.dispatch(actions.storageSuccess(JSON.parse(body)));
    }
  });
}

export function load(storageUuid, storageUrl) {
  store.dispatch(actions.load(storageUuid, storageUrl));


  request(storageUrl, 
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        store.dispatch(actions.storageSuccess(JSON.parse(body)));
      } else {
        store.dispatch(actions.storageError(error));
      }
  });
}


export function fund(faucetToken, faucetUrl) {
  store.dispatch(actions.fund(faucetToken, faucetUrl));

  let state = store.getState();

  let address = state.address;

  request({
    url: faucetUrl,
    method: "POST",
    json: true,
    body: {
      faucetToken: faucetToken,
      address: address
    }
  }, function (error, response, body){
    if (error) {
      store.dispatch(actions.fundError(error));
    } else {
      store.dispatch(actions.fundSuccess());
    }
  });
}

export function setup(phoneNumber, recoveryToken, oracleUrl) {
  store.dispatch(actions.setup(phoneNumber, recoveryToken, oracleUrl));

  let state = store.getState();

  let address = state.address;

  request({
    url: oracleUrl,
    method: "POST",
    json: true,
    body: {
      recoveryToken: recoveryToken,
      address: address,
      phoneNumber: phoneNumber
    }
  }, function (error, response, body){
    if (error) {
      store.dispatch(actions.setupError(error));
    } else {
      store.dispatch(actions.setupSuccess(JSON.parse(body)));
    }
  });
}

export function recover(lostAddress, recoveryToken, recoveryUuid, oracleUrl) {
  store.dispatch(actions.recover(lostAddress, recoveryToken, recoveryUuid, oracleUrl));

  let state = store.getState();

  let newAddress = state.address;

  request({
    url: oracleUrl,
    method: "POST",
    json: true,
    body: {
      recoveryToken: recoveryToken,
      newAddress: newAddress,
      lostAddress: lostAddress,
      phoneNumber: phoneNumber
    }
  }, function (error, response, body){
    if (error) {
      store.dispatch(actions.recoverError(error));
    } else {
      store.dispatch(actions.recoverSuccess(JSON.parse(body)));
    }
  });
}

export function close() {
  store.dispatch(actions.close());
  unsubscribe();
}

export function approveTransaction(txParams, cb) {
  cb(null, true);
}


export function signTransaction(txData, cb) {
  let state = store.getState();

  if (!state.storageUuid || !state.isFunded || !state.seed) {
    throw new Error('Beychain not set up for signing!');
  }

  var tx = new Tx(txData);
  tx.sign(state.seed);

  var serializedTx = tx.serialize();
  cb(null, serializedTx);
}

