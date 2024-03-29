import { fromJS } from 'immutable';
import { SOCIAL_IDS } from '../constants';

const timeout = (duration = 1500) => new Promise(r => setTimeout(r, duration));

export const mockDecode = async password => {
  await timeout();
  return password + 'decoded';
};

export const getRandomString = (length = 8) =>
  Math.random()
    .toString(16)
    .slice(2, 2 + length);

export const mockGetMySecrets = async () => {
  await timeout();
  /** @type {() => import("..").SecretType} */
  const createSecret = index => {
    return {
      _id: getRandomString(),
      _openid: getRandomString(),
      name: 'mock秘密' + index,
      account: 'mock_account',
      password: getRandomString(),

      phone: '19852811088',
      socialList: [
        {
          name: '微信',
          account: 'ericlpl',
          id: SOCIAL_IDS.WECHAT
        },
        {
          name: '新浪微博',
          account: 'eric1997@yeah.net',
          id: SOCIAL_IDS.SINA
        }
      ],

      createAt: +new Date()
    };
  };
  // return fromJS([])
  return fromJS(
    Array(20)
      .fill(undefined)
      .map((_, index) => ({
        ...createSecret(index),
        createAt: Date.now() + index * 10000
      }))
  );
};

export const mockDeleteSecret = async () => {
  await timeout();
  return true;
};

export const mockUpsertSecret = async item => {
  await timeout();
  return fromJS({ _id: item['_id'] || getRandomString() });
};

/**
 * @returns {import('..').UserType}
 */
export const mockAuth = async () => {
  await timeout();
  return fromJS({
    _id: getRandomString(),
    since: +new Date(),
    state: 2
  });
};

export const mockSetOnePassword = async () => {
  await timeout();
  return true;
};
