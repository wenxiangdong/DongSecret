import githubSVG from '../images/social-github.svg';
import sinaSVG from '../images/social-sina.svg';
import wechatSVG from '../images/social-wechat.svg';
const stringifyQuery = object =>
  Object.keys(object)
    .map(key => `${key}=${object[key]}`)
    .join('&');
export const ROUTES = {
  UPDATE_PASSWORD: () => '/pages/setting/update-password/index',
  INDEX: () => '/pages/index/index',
  SECRET_DETAIL: (/** @type {{id: string}} */ props = {}) => {
    const query = stringifyQuery(props);
    return `/pages/secret/detail/index?${query}`;
  },
  SECRET_UPSERT: (/** @type {{id: string}} */ props = {}) => {
    return `/pages/secret/upsert/index?${stringifyQuery(props)}`;
  }
};

export const COLOR_LIST = [
  '#03A9F4',
  '#4CAF50',
  '#8BC34A',
  '#FFC107',
  '#FF9800',
  '#FF7043'
];

export const SOCIAL_IDS = {
  WECHAT: 'wechat',
  SINA: 'sina',
  GITHUB: 'github'
};
export const SOCIAL_LOGOS = {
  [SOCIAL_IDS.WECHAT]: wechatSVG,
  [SOCIAL_IDS.SINA]: sinaSVG,
  [SOCIAL_IDS.GITHUB]: githubSVG
};

export const ONE_PASSWORD_KEY = 'DongSecret-one-password';
