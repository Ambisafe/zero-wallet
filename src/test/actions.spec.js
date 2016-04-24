import expect from 'expect'
import * as types from '../constants/ActionTypes'
import * as actions from '../actions'

describe('wallet actions', () => {

  it('generate should create GENERATE action', () => {
    expect(actions.generate('random')).toEqual({
      type: types.GENERATE,
      entropy: 'random'
    })
  })

  it('generateSuccess should create GENERATE_SUCCESS action', () => {
    expect(actions.generateSuccess('123', '0x123')).toEqual({
      type: types.GENERATE_SUCCESS,
        seed: '123',
        address: '0x123'
    })
  })

  it('encrypt should create ENCRYPT action', () => {
    expect(actions.encrypt('abc','url')).toEqual({
      type: types.ENCRYPT,
      password: 'abc',
      workerUrl: 'url'
    })
  })

  it('store should create STORE action', () => {
    expect(actions.save('token')).toEqual({
      type: types.STORE,
      storageToken: 'token'
    })
  })

  it('fund should create FUND action', () => {
    expect(actions.fund('token', 'url')).toEqual({
      type: types.FUND,
      faucetToken: 'token',
      faucetUrl: 'url'
    })
  })

  it('setup should create SETUP action', () => {
    expect(actions.setup('555', 'token')).toEqual({
      type: types.SETUP,
      phoneNumber: '555',
      recoveryToken: 'token'
    })
  })

  it('close should create CLOSE action', () => {
    expect(actions.close()).toEqual({
      type: types.CLOSE
    })
  })

  it('recover should create RECOVER action', () => {
    expect(actions.recover('0x123', 'token')).toEqual({
      type: types.RECOVER,
      recoveryToken: 'token',
      lostAddress: '0x123'
    })
  })
  it('load should create LOAD action', () => {
    expect(actions.load('uuid')).toEqual({
      type: types.LOAD,
      storageUuid: 'uuid'
    })
  })
  it('loadSuccess should create LOAD_SUCCESS action', () => {
    expect(actions.loadSuccess('xyz', '0x123')).toEqual({
      type: types.LOAD_SUCCESS,
      encrypted: 'xyz',
      address: '0x123'
    })
  })
  it('decrypt should create DECRYPT action', () => {
    expect(actions.decrypt('abc', 'url')).toEqual({
      type: types.DECRYPT,
      password: 'abc',
      workerUrl: 'url'
    })
  })
  it('decryptSuccess should create DECRYPT_SUCCESS action', () => {
    expect(actions.decryptSuccess('123', '0x123')).toEqual({
      type: types.DECRYPT_SUCCESS,
      seed: '123',
      address: '0x123'
    })
  })
  it('decryptError should create DECRYPT_ERROR action', () => {
    expect(actions.decryptError('error')).toEqual({
      type: types.DECRYPT_ERROR,
      decryptError: 'error'
    })
  })
  it('loadNotFound should create LOAD_ERROR action', () => {
    expect(actions.loadError('error')).toEqual({
      type: types.LOAD_ERROR,
      loadError: 'error'
    })
  })
})

