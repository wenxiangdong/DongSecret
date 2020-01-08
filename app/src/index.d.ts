import {Record as ImmutableRecord} from "immutable";
export interface Response<T = any> {
    data: T;
    code: number;
    message: string;
}

export interface SocialType {
    name: string;
    account: string;
}

export type Record<T> = ImmutableRecord<T>;

export interface SecretType {
    _id: string;
    _openid: string;
    // main info
    name: string;
    account: string;
    password: string;
    
    // extra info
    phone: string;  // 某些账号绑定了手机
    socialList: SocialType[];   // 绑定了某些社交账号

    // 前端自加
    decoded: false;     // 是否已经解码过了
}