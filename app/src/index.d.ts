import {RecordOf as ImmutableRecord} from "immutable";
export type Record<T> = ImmutableRecord<T>;


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

}
export type SecretRecord = Record<SecretType>;
export type SocialRecord = Record<SocialType>;



export type ValidationFunction = <T = any>(value: T) => string;
export type ValidationMap<T> = {[K in keyof T]?: Array<ValidationFunction<T[K]>>};
export type MapEventToValue<T> = {[K in keyof T]?: (key: K) => T[K];}
export type MakeForm<T = any> = (validationMap?: ValidationMap<T>, mapEventToValue?: MapEventToValue<T>) => UseForm<T>
export type UseFormHandlers<T> = Record<{
    [K in keyof T]: (value: any) => void;
}>
export type UseFormErrors<T> = Record<{
    [K in keyof T]: Array<string>;
}>;
export type UseForm<T = any> = (initState: T) => [
    Record<T>,
    UseFormErrors<T>,
    UseFormHandlers<T>,
];

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

export type UserRecord = Record<UserType>;