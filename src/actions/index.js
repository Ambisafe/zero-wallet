import * as types from '../constants/ActionTypes'


export function generate(entropy) {
  return { type: types.GENERATE, entropy }
}

export function generateSuccess(seed, address) {
  return { type: types.GENERATE_SUCCESS, seed, address }
}

export function encrypt(password, workerUrl) {
  return { type: types.ENCRYPT, password , workerUrl }
}

export function encryptSuccess(encrypted) {
  return { type: types.ENCRYPT_SUCCESS, encrypted }
}

export function encryptError(encryptError) {
  return { type: types.ENCRYPT_ERROR, encryptError }
}

export function save(storageToken) {
  return { type: types.STORE, storageToken }
}

export function saveSuccess(storageUuid) {
  return { type: types.STORE_SUCCESS, storageToken }
}

export function saveError(storageError) {
  return { type: types.STORE_ERROR, storageError }
}

export function fund(faucetToken, faucetUrl) {
  return { type: types.FUND, faucetToken, faucetUrl }
}

export function fundSuccess() {
  return { type: types.FUND_SUCCESS }
}

export function fundError(fundError) {
  return { type: types.FUND_ERROR, fundError }
}

export function setup(phoneNumber, recoveryToken) {
  return { type: types.SETUP, phoneNumber, recoveryToken }
}

export function setupSuccess(recoveryUuid) {
  return { type: types.SETUP_SUCCESS, recoveryUuid }
}

export function setupError(setupError) {
  return { type: types.SETUP_ERROR, setupError }
}

export function load(storageUuid) {
  return { type: types.LOAD, storageUuid }
}

export function loadSuccess(encrypted, address) {
  return { type: types.LOAD_SUCCESS, encrypted, address }
}

export function loadError(loadError) {
  return { type: types.LOAD_ERROR, loadError }
}

export function decrypt(password, workerUrl) {
  return { type: types.DECRYPT, password, workerUrl }
}

export function decryptSuccess(seed, address) {
  return { type: types.DECRYPT_SUCCESS, seed, address }
}

export function decryptError(decryptError) {
  return { type: types.DECRYPT_ERROR, decryptError }
}

export function recover(lostAddress, recoveryToken) {
  return { type: types.RECOVER, lostAddress, recoveryToken }
}

export function recoverSuccess() {
  return { type: types.RECOVER_SUCCESS }
}

export function recoverError(recoverError) {
  return { type: types.RECOVER_ERROR, recoverError }
}

export function close() {
  return { type: types.CLOSE }
}