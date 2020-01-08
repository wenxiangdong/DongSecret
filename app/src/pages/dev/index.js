import React from 'react';
import { redirectTo } from "remax/wechat";
import { ROUTES } from "../../constants";
import SecretListContainer from '../../containers/SecretListContainer';
import useLogger from '../../hooks/use-logger';

export default function() {
    useLogger('dev', {auto: true});
    return <SecretListContainer />;
}