import React from 'react';
import { redirectTo, navigateTo } from "remax/wechat";
import { ROUTES } from "../../constants";
import SecretListContainer from '../../containers/SecretListContainer';
import useLogger from '../../hooks/use-logger';
import { getRandomString } from '../../apis/__mock__';
import SecretDetail from '../../components/SecretDetail';
import { fromJS } from 'immutable';

const secret = fromJS({
        _id: getRandomString(),
        _openid: getRandomString(),
        name: 'mock秘密',
        account: 'mock_account',
        password: getRandomString(),
        
        phone: '19852811088',
        socialList: [],
})
export default function() {
    useLogger('dev', {auto: true});
    redirectTo({
        url: ROUTES.INDEX,
    })
    // return (
    //     <SecretDetail secret={secret} />
    // );
    return null;
}