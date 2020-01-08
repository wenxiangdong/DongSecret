import {mockDecode, mockGetMySecrets} from './__mock__';
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

export const API = {
    decode: USE_MOCK ? mockDecode : decode,
    getMySecrets: USE_MOCK ? mockGetMySecrets : getMySecrets,
}