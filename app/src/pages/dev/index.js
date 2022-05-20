import React from 'react';
import { redirectTo, navigateTo, View } from 'remax/wechat';
import { ROUTES, SOCIAL_IDS } from '../../constants';
import SecretListContainer from '../../containers/SecretListContainer';
import useLogger from '../../hooks/use-logger';
import { getRandomString } from '../../apis/__mock__';
import { fromJS, List } from 'immutable';
import SecretForm from '../../components/SecretForm';
import Background from '../../components/common/Background';
import Setting from '../index/setting';
import Home from '../index/home';
import PasswordInput from '../../components/PasswordInput';
import Loading from '../../components/common/Loading';
import withAuth from '../../hocs/with-auth';
import AuthLayer from '../../components/common/AuthLayer';
import SocialForm from '../../components/SocialForm';
import Dialog from '@vant/weapp/lib/dialog';
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
const Dev = () => {
  const log = useLogger('dev', { auto: true });
  redirectTo({
    url: ROUTES.INDEX()
  });
  return null;
  // return (
  //   // <Dialog show={true} use-slot show-confirm-button={false} title="社交">
  //   <SecretForm secret={secret} />
  //   // </Dialog>
  // );
};

export default Dev;
