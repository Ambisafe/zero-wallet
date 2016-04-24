import expect from 'expect'
import wallet from '../reducers'
import * as types from '../constants/ActionTypes'

describe('wallet reducer', () => {
  it('should handle GENERATE', () => {
    expect(
      wallet({
      },
      {
        type: 'GENERATE',
        entropy: 'random'
      })
    ).toEqual({
      entropy: 'random'
    })
  })
  it('should handle GENERATE_SUCCESS', () => {
    expect(
      wallet({
        entropy: 'random'
      },
      {
        type: 'GENERATE_SUCCESS',
        seed: '123',
        address: '0x123'
      })
    ).toEqual({
      seed: '123',
      address: '0x123'
    })
  })
  it('should handle ENCRYPT', () => {
    expect(
      wallet(
      {//### state
        seed: '123'
      },
      {//### action
        type: 'ENCRYPT',
        password: 'abc',
        workerUrl: 'url',
      })
    ).toEqual(
    {//## next state
      seed: '123',
      password: 'abc',
      workerUrl: 'url'
    })
  })
  it('should handle ENCRYPT_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        seed: '123',
        password: 'abc',
        workerUrl: 'url'
      },
      {//### action
        type: 'ENCRYPT_SUCCESS',
        encrypted: 'xyz'
      })
    ).toEqual(
    {//## next state
      seed: '123',
      encrypted: 'xyz'
    })
  })
  it('should handle ENCRYPT_ERROR', () => {
    expect(
      wallet(
      {//### state
        seed: '123',
        password: 'abc',
        workerUrl: 'url'
      },
      {//### action
        type: 'ENCRYPT_ERROR',
        encryptError: 'error'
      })
    ).toEqual(
    {//## next state
      seed: '123',
      password: 'abc',
      workerUrl: 'url',
      encryptError: 'error'
    })
  })
  it('should handle STORE', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        encrypted: 'xyz'
      },
      {//### action
        type: 'STORE',
        storageToken: 'token'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      encrypted: 'xyz',
      storageToken: 'token'
    })
  })
  it('should handle STORE_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        encrypted: 'xyz',
        storageToken: 'token'
      },
      {//### action
        type: 'STORE_SUCCESS',
        storageUuid: 'uuid'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      encrypted: 'xyz',
      storageUuid: 'uuid'
    })
  })
  it('should handle STORE_ERROR', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        encrypted: 'xyz',
        storageToken: 'token'
      },
      {//### action
        type: 'STORE_ERROR',
        storageError: 'error'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      encrypted: 'xyz',
      storageError: 'error'
    })
  })
  it('should handle FUND', () => {
    expect(
      wallet(
      {//### state
        address: '0x123'
      },
      {//### action
        type: 'FUND',
        faucetToken: 'token'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      faucetToken: 'token',
      isFunded: false
    })
  })
  it('should handle FUND_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        faucetToken: 'token'
      },
      {//### action
        type: 'FUND_SUCCESS'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      isFunded: true
    })
  })
  it('should handle FUND_ERROR', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        faucetToken: 'token'
      },
      {//### action
        type: 'FUND_ERROR',
        fundError: 'error'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      fundError: 'error',
      isFunded: false
    })
  })
  it('should handle RECOVER', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        recoveryUuid: 'uuid'
      },
      {//### action
        type: 'RECOVER',
        lostAddress: '0x456',
        recoveryToken: 'token'
      })
    ).toEqual(
    {//## next state
      recoveryUuid: 'uuid',
      newAddress: '0x123',
      lostAddress: '0x456',
      recoveryToken: 'token'
    })
  })
  it('should handle RECOVER_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        recoveryUuid: 'uuid',
        newAddress: '0x123',
        lostAddress: '0x456',
        recoveryToken: 'token'
      },
      {//### action
        type: 'RECOVER_SUCCESS'
      })
    ).toEqual(
    {//## next state
      recoveryUuid: 'uuid',
      address: '0x123'
    })
  })
  it('should handle RECOVER_ERROR', () => {
    expect(
      wallet(
      {//### state
        recoveryUuid: 'uuid',
        newAddress: '0x123',
        lostAddress: '0x456',
        recoveryToken: 'token'
      },
      {//### action
        type: 'RECOVER_ERROR',
        recoveryError: 'error'
      })
    ).toEqual(
    {//## next state
      recoveryUuid: 'uuid',
      newAddress: '0x123',
      lostAddress: '0x456',
      recoveryError: 'error'
    })
  })
  it('should handle SETUP', () => {
    expect(
      wallet(
      {//### state
        address: '0x123'
      },
      {//### action
        type: 'SETUP',
        phoneNumber: '555',
        recoveryToken: 'token'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      phoneNumber: '555',
      recoveryToken: 'token'
    })
  })
  it('should handle SETUP_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        phoneNumber: '555',
        recoveryToken: 'recovery'
      },
      {//### action
        type: 'SETUP_SUCCESS',
        recoveryUuid: 'uuid'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      recoveryUuid: 'uuid'
    })
  })
  it('should handle SETUP_ERROR', () => {
    expect(
      wallet(
      {//### state
        address: '0x123',
        phoneNumber: '555',
        recoveryToken: 'recovery'
      },
      {//### action
        type: 'SETUP_ERROR',
        setupError: 'error'
      })
    ).toEqual(
    {//## next state
      address: '0x123',
      phoneNumber: '555',
      setupError: 'error'
    })
  })
  it('should handle LOAD', () => {
    expect(
      wallet(
      {//### state
      },
      {//### action
        type: 'LOAD',
        storageUuid: 'uuid'
      })
    ).toEqual(
    {
      //## next state
      storageUuid: 'uuid'
    })
  })
  it('should handle LOAD_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        storageUuid: 'uuid'
      },
      {//### action
        type: 'LOAD_SUCCESS',
        encrypted: 'xyz',
        address: '0x123'
      })
    ).toEqual(
    {
      //## next state
      encrypted: 'xyz',
      address: '0x123'
    })
  })
  it('should handle LOAD_ERROR', () => {
    expect(
      wallet(
      {//### state
        storageUuid: 'uuid'
      },
      {//### action
        type: 'LOAD_ERROR',
        loadError: 'error'
      })
    ).toEqual(
    {
      //## next state
      storageUuid: 'uuid',
      loadError: 'error'
    })
  })
  it('should handle DECRYPT', () => {
    expect(
      wallet(
      {//### state
        encrypted: 'xyz'
      },
      {//### action
        type: 'DECRYPT',
        password: 'abc',
        workerUrl: 'url'
      })
    ).toEqual(
    {
      //## next state
      encrypted: 'xyz',
      password: 'abc',
      workerUrl: 'url'
    })
  })
  it('should handle DECRYPT_SUCCESS', () => {
    expect(
      wallet(
      {//### state
        encrypted: 'xyz',
        password: 'abc',
        workerUrl: 'url'
      },
      {//### action
        type: 'DECRYPT_SUCCESS',
        seed: '123',
        address: '0x123'
      })
    ).toEqual(
    {
      //## next state
      seed: '123',
      address: '0x123'
    })
  })
  it('should handle DECRYPT_ERROR', () => {
    expect(
      wallet(
      {//### state
        encrypted: 'xyz',
        password: 'abc',
        workerUrl: 'url'
      },
      {//### action
        type: 'DECRYPT_ERROR',
        decryptError: 'error'
      })
    ).toEqual(
    {
      //## next state
      encrypted: 'xyz',
      password: 'abc',
      workerUrl: 'url',
      decryptError: 'error'
    })
  })
  it('should handle CLOSE', () => {
    expect(
      wallet(
      {//### state
        address: '0x123'
      },
      {//### action
        type: 'CLOSE'
      })
    ).toEqual(
    {
      //## next state
    })
  })
})
