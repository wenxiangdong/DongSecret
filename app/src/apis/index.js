import {
  mockDecode,
  mockGetMySecrets,
  mockDeleteSecret,
  mockUpsertSecret,
  mockAuth,
  mockSetOnePassword
} from './__mock__';
import { fromJS, List } from 'immutable';

const USE_MOCK = true;
/**
 *
 * @param {String} password
 * @returns {Promise<String>}
 */
const decode = async password => {
  return password;
};

//================== 密码项相关 ========================//
/**
 * @type {() => List<Record<import('..').SecretType>>}
 */
const getMySecrets = async () => {
  return List();
};
/**
 *
 * @param {String} id
 */
const deleteSecret = async id => {
  return true;
};
/**
 *
 * @param {*} secret
 * @returns {{_id: String}}
 */
const upsertSecret = async secret => {
  return undefined;
};

//============ one password相关 =================//
const setOnePassword = (newPassword, oldPassword = '') => {
  return undefined;
};

//=============== 用户相关 ====================//
const auth = async () => {
  return undefined;
};

export const API = {
  decode: USE_MOCK ? mockDecode : decode,

  getMySecrets: USE_MOCK ? mockGetMySecrets : getMySecrets,
  deleteSecret: USE_MOCK ? mockDeleteSecret : deleteSecret,
  upsertSecret: USE_MOCK ? mockUpsertSecret : upsertSecret,

  setOnePassword: USE_MOCK ? mockSetOnePassword : setOnePassword,

  auth: USE_MOCK ? mockAuth : auth
};
