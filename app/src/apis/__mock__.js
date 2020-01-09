import { fromJS } from "immutable";

const timeout = (duration = 1500) => new Promise(r => setTimeout(r, duration));

export const mockDecode = async (password) => {
    await timeout();
    return password + "decoded";
};

export const getRandomString = (length = 8) => Math.random().toString(16).slice(2, 2 + length);

export const mockGetMySecrets = async () => {
    await timeout();
    /** @type {() => import("..").SecretType} */
    const createSecret = () => {
        return {
            _id: getRandomString(),
            _openid: getRandomString(),
            name: 'mock秘密',
            account: 'mock_account',
            password: getRandomString(),
            
            phone: '19852811088',
            socialList: [],
        }
    }
    // return fromJS([])
    return fromJS([
        createSecret(),
        createSecret(),
        createSecret(),
    ]);
}