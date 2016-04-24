import * as type from '../constants/ActionTypes'


export default function filter(state = {}, action) {
  let newState;
  switch (action.type) {
    case type.GENERATE:
      return {
      	...state,
      	entropy: action.entropy
      }
    case type.GENERATE_SUCCESS:
      newState = {
        ...state,
        seed: action.seed,
        address: action.address
      }
      delete newState.entropy;
      return newState;
    case type.ENCRYPT:
      return {
      	...state,
        workerUrl: action.workerUrl,
      	password: action.password
      }
    case type.ENCRYPT_SUCCESS:
      newState = {
        ...state,
        encrypted: action.encrypted
      }
      delete newState.workerUrl;
      delete newState.password;
      return newState;
    case type.ENCRYPT_ERROR:
      return {
        ...state,
        encryptError: action.encryptError
      }
    case type.STORE:
      return {
      	...state,
        storageToken: action.storageToken
      }
    case type.STORE_SUCCESS:
      newState = {
        ...state,
        storageUuid: action.storageUuid
      }
      delete newState.storageToken;
      return newState;
    case type.STORE_ERROR:
      newState = {
        ...state,
        storageError: action.storageError
      }
      delete newState.storageToken;
      return newState;
    case type.FUND:
      newState = {
        ...state,
        faucetToken: action.faucetToken,
        isFunded: false
      }
      return newState;
    case type.FUND_SUCCESS:
      newState =  {
        ...state,
        isFunded: true
      }
      delete newState.faucetToken;
      return newState;
    case type.FUND_ERROR:
      newState =  {
        ...state,
        isFunded: false,
        fundError: action.fundError
      }
      delete newState.faucetToken;
      return newState;
    case type.SETUP:
      return {
      	...state,
        recoveryToken: action.recoveryToken,
      	phoneNumber: action.phoneNumber
      }
    case type.SETUP_SUCCESS:
      newState = {
        ...state,
        recoveryUuid: action.recoveryUuid
      }
      delete newState.recoveryToken;
      delete newState.phoneNumber;
      return newState;
    case type.SETUP_ERROR:
      newState = {
        ...state,
        setupError: action.setupError
      }
      delete newState.recoveryToken;
      return newState;
    case type.RECOVER:
      newState = {
        ...state,
        recoveryToken: action.recoveryToken,
        newAddress: state.address,
        lostAddress: action.lostAddress
      }
      delete newState.address;
      return newState;
    case type.RECOVER_SUCCESS:
      newState = {
        ...state,
        address: state.newAddress
      }
      delete newState.recoveryToken;
      delete newState.newAddress;
      delete newState.lostAddress;
      return newState;
    case type.RECOVER_ERROR:
      newState = {
        ...state,
        recoveryError: action.recoveryError
      }
      delete newState.recoveryToken;
      return newState;
    case type.LOAD:
      return {
        ...state,
        storageUuid: action.storageUuid
      }
    case type.LOAD_SUCCESS:
      newState = {
        ...state,
        encrypted: action.encrypted,
        address: action.address
      }
      delete newState.storageUuid;
      return newState;
    case type.LOAD_ERROR:
      return {
        ...state,
        loadError: action.loadError
      }
    case type.DECRYPT:
      return {
        ...state,
        workerUrl: action.workerUrl,
        password: action.password
      }
    case type.DECRYPT_SUCCESS:
      newState = {
        ...state,
        seed: action.seed,
        address: action.address
      }
      delete newState.encrypted;
      delete newState.workerUrl;
      delete newState.password;
      return newState;
    case type.DECRYPT_ERROR:
      return {
        ...state,
        decryptError: action.decryptError
      }
    case type.CLOSE:
      return {}
    default:
      return state
  }
}