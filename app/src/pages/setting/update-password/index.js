import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './index.module.less';
import { View, showToast, navigateTo, navigateBack } from 'remax/wechat';
import { ROUTES, TOAST_DURATION } from '../../../constants';
import { useContainer } from 'unstated-next';
import { PasswordStore } from '../../../stores/password';
import { UserStore } from '../../../stores/user';
import useLogger from '../../../hooks/use-logger';
import useNavigationBar from '../../../hooks/use-navigation-bar';
import PasswordInput from '../../../components/PasswordInput';
import Button from '@vant/weapp/dist/button';
import useAsync from '../../../hooks/use-async';
import { API } from '../../../apis';
import withAuth from '../../../hocs/with-auth';
import WhiteSpace from '../../../components/common/WhiteSpace';

const SectionTitle = ({ title, desc }) => {
  return (
    <View className={styles.sectionTitle}>
      <View className={styles.title}>{title}</View>
      <View className={styles.desc}>{desc}</View>
    </View>
  );
};

const UpdatePassword = props => {
  const log = useLogger('setting/update-password');
  useNavigationBar({ title: '设置 One Password' });

  const [globalPassword, setGlobalPassword] = useContainer(PasswordStore);
  const [user, setUser] = useContainer(UserStore);

  const [oldPassword, setOldPassword] = useState(globalPassword);
  const [newPassword, setNewPassword] = useState('');

  /** 表单是否合格 */
  const formValid = useMemo(() => {
    let valid = !!newPassword;
    // 还要检验旧密码么？
    if (user.get('state') >= 2) {
      valid = valid && !!oldPassword;
    }
    return valid;
  }, [newPassword, oldPassword, user]);

  /** 调用api */
  const asyncSetOnePasswordApi = useCallback(
    async () => API.setOnePassword(newPassword, oldPassword),
    [newPassword, oldPassword]
  );
  const {
    result: apiResult,
    loading: apiLoading,
    call: apiCall,
    error: apiError
  } = useAsync(asyncSetOnePasswordApi, { autoCall: false });

  /** api调用结果副作用 */
  useEffect(() => {
    if (!!apiError) {
      log(apiError);
      showToast({
        title: `设置失败，${apiError?.message} ,请重试`,
        icon: 'none'
      });
      return;
    }
    if (!!apiResult) {
      setGlobalPassword(newPassword);
      showToast({
        title: `设置成功`,
        icon: 'success',
        duration: TOAST_DURATION
      });
      setTimeout(() => {
        navigateBack();
      }, TOAST_DURATION);
    }
  }, [apiResult, apiError]);

  const oldPasswordInput = useMemo(() => {
    const handleComplete = value => {
      log('set old', value);
      setOldPassword(value);
    };
    return (
      <PasswordInput onComplete={handleComplete} initValue={oldPassword} />
    );
  }, []);

  const newPasswordInput = useMemo(() => {
    const handleComplete = value => {
      log('set new', value);
      setNewPassword(value);
    };
    return <PasswordInput onComplete={handleComplete} />;
  }, []);

  const okButton = useMemo(() => {
    return (
      <View className={styles.buttonWrapper}>
        <Button
          icon="certificate"
          type="primary"
          block
          loading={apiLoading}
          disabled={!formValid}
          bindclick={apiCall}
        />
      </View>
    );
  }, [apiCall, apiLoading, formValid]);

  return (
    <View className={styles.wrapper}>
      <View className={styles.passwordForm}>
        {+user.get('state') >= 2 && (
          <>
            <SectionTitle
              title="旧 One Password"
              desc="需要提供旧密码来更新服务器上的密码加密"
            />
            <View className={styles.passwordInputWrapper}>
              {oldPasswordInput}
            </View>
            <WhiteSpace />
          </>
        )}
        <>
          <SectionTitle
            title="新 One Password"
            desc="密码只存在本地，它将作为你解码所有其他密码的根据"
          />
          <View className={styles.passwordInputWrapper}>
            {newPasswordInput}
          </View>
        </>
      </View>

      {okButton}
    </View>
  );
};

export default withAuth(UpdatePassword);
