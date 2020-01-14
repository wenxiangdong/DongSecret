import { View } from "remax/wechat";
import React, { useMemo, useCallback } from 'react';
import useNavigationBar from "../../../hooks/use-navigation-bar";
import { useContainer } from "unstated-next";
import {SecretsStore} from '../../../stores/secrets';
import SecretForm from "../../../components/SecretForm";
import { API } from "../../../apis";
import useLogger from "../../../hooks/use-logger";



export default function({location: {query: {id} = {}}}) {
    const isNew = useMemo(() => !id);
    const navigationBarTitle = useMemo(() => isNew ? '新建秘密' : '修改秘密', [isNew]);
    useNavigationBar({title: navigationBarTitle});
    
    const log = useLogger('/pages/secret/upsert');
    
    const {getItem, updateItem} = useContainer(SecretsStore);
    
    const secret = useMemo(() => {
        const item = getItem(id);
        return item;
    }, [id, getItem]);

    const handleSubmit = useCallback(async (submittedSecret) => {
        const shouldMutate = !(secret && secret.equals(submittedSecret));
        log(shouldMutate);
        if (shouldMutate) {
            await API.upsertSecret(submittedSecret.toJS());
            updateItem(submittedSecret);
        }
    }, [updateItem, secret]);

    return (
        <>
        <View>upsert</View>
        <SecretForm secret={secret} onSubmit={handleSubmit} />
        </>
    );
}