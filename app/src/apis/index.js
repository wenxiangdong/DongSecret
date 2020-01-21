import {
  mockDecode,
  mockGetMySecrets,
  mockDeleteSecret,
  mockUpsertSecret,
  mockAuth,
  mockSetOnePassword
} from './__mock__';
import { fromJS, List } from 'immutable';
import { callCloudFunction } from './cloud';
import { PATHS } from './paths';

/**
 * 是否使用MOCK
 */
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
  const secrets = await callCloudFunction(PATHS.GET_SECRETS);
  return fromJS(secrets);
};
/**
 *
 * @param {String} id
 */
const deleteSecret = async id => {
  const removed = await callCloudFunction(PATHS.DELETE_SECRET, {
    ids: [id]
  });
  return removed;
};
/**
 *
 * @param {*} secret
 * @returns {{_id: String}}
 */
const upsertSecret = async secret => {
  const updatedSecret = await callCloudFunction(PATHS.UPSERT_SECRET, {
    secret
  });
  return fromJS(updatedSecret);
};

//============ one password相关 =================//
const setOnePassword = (newPassword, oldPassword = '') => {
  return undefined;
};

//=============== 用户相关 ====================//
const auth = async () => {
  const user = await callCloudFunction(PATHS.AUTH);
  return fromJS(user);
};

export const API = {
  decode: USE_MOCK ? mockDecode : decode,

  getMySecrets: USE_MOCK ? mockGetMySecrets : getMySecrets,
  deleteSecret: USE_MOCK ? mockDeleteSecret : deleteSecret,
  upsertSecret: USE_MOCK ? mockUpsertSecret : upsertSecret,

  setOnePassword: USE_MOCK ? mockSetOnePassword : setOnePassword,

  auth: USE_MOCK ? mockAuth : auth
};
