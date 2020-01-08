import {mockDecode} from './__mock__';

const USE_MOCK = true;

const decode = USE_MOCK 
    ? async (password) => {
        return password;
    }
    : mockDecode;

export const API = {
    decode,
}