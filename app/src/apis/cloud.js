import { cloud, showToast } from 'remax/wechat';
import { ENVS } from '../constants/index';

cloud.init({ env: ENVS.production });
const CLOUD_FUNCTION_NAME = 'api';
export const callCloudFunction = async (path, param = {}) => {
  const { result } = await cloud.callFunction({
    name: CLOUD_FUNCTION_NAME,
    data: {
      $url: path,
      ...param
    }
  });
  console.log(`请求${path}得到`, result);
  /** @type {import('..').Response} */
  const response = result;
  if (+response.code === 200) {
    return response.data;
  } else {
    throw response;
  }
};
