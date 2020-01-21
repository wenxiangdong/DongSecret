import { API } from '../apis';
import useAsync from './use-async';
import { useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { SecretsStore } from '../stores/secrets';

export default (autoLoad = false) => {
  const { result, loading, error, call } = useAsync(API.getMySecrets, {
    autoCall: autoLoad
  });
  const { setAll, secrets } = useContainer(SecretsStore);
  useEffect(() => {
    result && setAll(result);
  }, [result]);

  return {
    secrets,
    loading,
    error,
    reload: call
  };
};
