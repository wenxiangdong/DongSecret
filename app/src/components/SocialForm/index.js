import React, { useMemo, useCallback, useEffect } from 'react';
import styles from './index.module.less';
import { View } from 'remax/wechat';
import Panel from '@vant/weapp/lib/panel';
import Field from '@vant/weapp/lib/field';
import RadioGroup from '@vant/weapp/lib/radio-group';
import Radio from '@vant/weapp/lib/radio';
import Button from '@vant/weapp/lib/button';
import { makeForm, Validators } from '../../hooks/use-form';
import { SOCIAL_IDS, SOCIAL_TYPES } from '../../constants';
import useLogger from '../../hooks/use-logger';

/**
 * Field组件的 事件-value 转换函数
 */
const MapFieldChangeEventToValue = ({ detail }) => detail;

const useForm = makeForm({
  name: [Validators.required('名称不能为空')],
  account: [Validators.required('账号不能为空')],
  id: [Validators.required('必须选择一个类型')]
});

/**
 * @type {import('../..').SocialType}
 */
const DEFAULT_SOCIAL = {
  name: '',
  account: '',
  id: SOCIAL_IDS.WECHAT
};
/**
 * @param {{
 * onSubmit?: (social: import('../../index').SocialRecord) => void;
 * social?: import('../../index').SocialRecord;
 * }}
 */
export default ({ show, social, onSubmit }) => {
  const log = useLogger('SocialForm');
  const [socialForm, errors, onChanges, formValid] = useForm(
    social?.toJS() || DEFAULT_SOCIAL
  );

  useEffect(() => {
    log(socialForm.toJS(), errors.toJS(), formValid);
  }, [socialForm, errors, formValid]);

  const nameField = useMemo(() => {
    const key = 'name';
    const value = socialForm.get(key);
    const handler = e => {
      log('set name', e);
      onChanges?.get(key)?.(MapFieldChangeEventToValue(e));
    };
    return (
      <Field
        clearable
        required={true}
        label="名称"
        value={value}
        error={!!errors.get(key)?.length}
        error-message={errors.get(key)?.join(' ')}
        bindchange={handler}
      />
    );
  }, [socialForm.get('name'), errors.get('name'), onChanges.get('name')]);

  const accountFiled = useMemo(() => {
    const key = 'account';
    const value = socialForm.get(key);
    const handler = e => {
      log('set account', e);
      onChanges?.get(key)?.(MapFieldChangeEventToValue(e));
    };
    return (
      <Field
        clearable
        required={true}
        label="账号"
        value={value}
        error={!!errors.get(key)?.length}
        error-message={errors.get(key)?.join(' ')}
        bindchange={handler}
      />
    );
  }, [
    socialForm.get('account'),
    errors.get('account'),
    onChanges.get('account')
  ]);

  const idField = useMemo(() => {
    const key = 'id';
    const value = socialForm.get(key);
    const handler = e => {
      log(e);
      onChanges?.get(key)?.(MapFieldChangeEventToValue(e));
    };
    return (
      <>
        <Field
          readonly
          required={true}
          label="类型"
          value={SOCIAL_TYPES[value]}
          error={!!errors.get(key)?.length}
          error-message={errors.get(key)?.join(' ')}
        />
        <View className={styles.radioGroupWrapper}>
          <RadioGroup value={value} bindchange={handler}>
            {Object.keys(SOCIAL_IDS).map(key => {
              const id = SOCIAL_IDS[key];
              const type = SOCIAL_TYPES[id];
              return (
                <Radio key={id} name={id} custom-class={styles.radio}>
                  {type}
                </Radio>
              );
            })}
          </RadioGroup>
        </View>
      </>
    );
  }, [socialForm.get('id'), errors.get('id'), onChanges.get('id')]);

  const submitButton = useMemo(() => {
    const handleClick = () => {
      onSubmit?.(socialForm);
    };
    return (
      <Button type="info" block bindclick={handleClick} disabled={!formValid}>
        提交
      </Button>
    );
  }, [formValid, onSubmit, socialForm]);

  return (
    <Panel>
      <View className={styles.panel}>
        {nameField}
        {accountFiled}
        {idField}
      </View>
      {submitButton}
    </Panel>
  );
};
