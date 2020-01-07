import { getStorageSync } from "remax/wechat";
import { createContainer } from "unstated-next";
import { useState } from "react";

const KEY = 'DongSecret-one-password';
/**
 * 全局密码
 */
const password = getStorageSync(KEY) || "";

const usePassword = () => {
    const state = useState(password);
    return state;
};

export const PasswordStore = createContainer(usePassword);
