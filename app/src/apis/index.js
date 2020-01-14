import {mockDecode, mockGetMySecrets, mockDeleteSecret, mockUpsertSecret} from './__mock__';
import { fromJS, List } from 'immutable';

const USE_MOCK = true;

const decode = async (password) => {
    return password;
}
/**
 * @type {() => List<Record<import('..').SecretType>>}
 */
const getMySecrets = async () => {
    return List();
}

/**
 * 
 * @param {String} id 
 */
const deleteSecret = async (id) => {
    return true;
}

const upsertSecret = async (secret) => {
    return undefined;
}

export const API = {
    decode: USE_MOCK ? mockDecode : decode,
    getMySecrets: USE_MOCK ? mockGetMySecrets : getMySecrets,
    deleteSecret: USE_MOCK ? mockDeleteSecret : deleteSecret,
    upsertSecret: USE_MOCK ? mockUpsertSecret : upsertSecret,
}