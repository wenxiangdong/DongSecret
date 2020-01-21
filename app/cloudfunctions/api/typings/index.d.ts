
export interface Response<T = any> {
    data: T;
    code: number;
    message: string;
}
export interface SocialType {
    id: string;
    name: string;
    account: string;
}
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

    // data info
    createAt: number;

    // 前端自加
    decoded: false;     // 是否已经解码过了
}

export enum UserStates {
    NORMAL = 2,
    NEW = 0,    // 新用户
    NOT_SET_PASSWORD = 1,   // 还没设置过全局密码
}

export interface UserType {
    _id: string;
    since: number;  // 什么时候开始使用
    state: UserStates;

    // 前端自定
    valid: boolean; // 是否要重新获取
}