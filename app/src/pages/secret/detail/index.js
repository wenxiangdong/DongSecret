import React, { useEffect } from 'react';
import { View, Button } from 'remax/wechat';
import { fromJS } from 'immutable';
import styles from './index.module.less';
import SecretDetail from '../../../components/SecretDetail';
import useLogger from '../../../hooks/use-logger';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../../../stores/secrets';


export default (props) => {
    const log = useLogger('secret/detail/index');

    log(props.location.query);
    const {getItem, remove, updateItem} = useContainer(SecretsStore);
    const secret = getItem(props.location.query.id);
    log(secret);

    return (
        <View className={styles.wrapper}>
            <SecretDetail secret={secret} onDelete={remove} onUpdate={updateItem} />
        </View>
    );
}
