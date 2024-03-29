import { View, redirectTo, navigateBack } from 'remax/wechat';
import React, { useMemo, useCallback } from 'react';
import useNavigationBar from '../../../hooks/use-navigation-bar';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../../../stores/secrets';
import SecretForm from '../../../components/SecretForm';
import { API } from '../../../apis';
import useLogger from '../../../hooks/use-logger';
import { fromJS } from 'immutable';
import { ROUTES } from '../../../constants';
import { PasswordStore } from '../../../stores/password';
import withAuth from '../../../hocs/with-auth';

const Upsert = ({ location: { query: { id } = {} } }) => {
  const isNew = useMemo(() => !id);
  const navigationBarTitle = useMemo(() => (isNew ? '新建秘密' : '修改秘密'), [
    isNew
  ]);
  useNavigationBar({ title: navigationBarTitle });

  const log = useLogger('/pages/secret/upsert');

  const [key] = useContainer(PasswordStore);
  const { secrets, updateItem } = useContainer(SecretsStore);
  const secret = useMemo(() => secrets.find(item => item.get('_id') === id), [
    id,
    secrets
  ]);

  const handleSubmit = useCallback(
    async submittedSecret => {
      const shouldMutate = !(secret && secret.equals(submittedSecret));
      log(shouldMutate);
      if (shouldMutate) {
        const result = await API.upsertSecret(submittedSecret.toJS(), key);
        updateItem(
          fromJS({
            ...submittedSecret.toJS(),
            ...result.toJS()
          })
        );
        navigateBack();
      }
    },
    [updateItem, secret, key]
  );

  return (
    <>
      <SecretForm secret={secret} onSubmit={handleSubmit} />
    </>
  );
};

export default withAuth(Upsert);
