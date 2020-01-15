import React from 'react';
import { redirectTo, navigateTo } from 'remax/wechat';
import { ROUTES, SOCIAL_IDS } from '../../constants';
import SecretListContainer from '../../containers/SecretListContainer';
import useLogger from '../../hooks/use-logger';
import { getRandomString } from '../../apis/__mock__';
import { fromJS } from 'immutable';
import SecretForm from '../../components/SecretForm';
// import SecretDetail from '../../components/SecretDetail';

/** @type {import("../../index").SecretType} */
const mock = {
  _id: getRandomString(),
  _openid: getRandomString(),
  name: 'mock秘密',
  account: 'mock_account',
  password: getRandomString(),

  phone: '19852811088',
  socialList: [
    {
      name: '微信',
      account: 'ericlpl',
      id: SOCIAL_IDS.WECHAT
    },
    {
      name: '新浪微博',
      account: 'eric1997@yeah.net',
      id: SOCIAL_IDS.SINA
    }
  ]
};
const secret = fromJS(mock);
export default function() {
  useLogger('dev', { auto: true });
  redirectTo({
    url: ROUTES.SECRET_UPSERT()
  });
  // return (
  //   <>
  //     <SecretForm secret={secret} onSubmit={console.log} />
  //     {/* <SecretDetail secret={secret} /> */}
  //   </>
  // );
  return null;
}
