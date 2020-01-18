import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { View, showToast } from 'remax/wechat';
import { makeForm, Validators } from '../../hooks/use-form';
import Field from '@vant/weapp/dist/field';
import CellGroup from '@vant/weapp/dist/cell-group';
import Button from '@vant/weapp/dist/button';
import Panel from '@vant/weapp/dist/panel';
import Dialog from '@vant/weapp/dist/dialog';
import Cell from '@vant/weapp/dist/cell';
import useLogger from '../../hooks/use-logger';
import SocialItem from '../SocialItem';
import { List } from 'immutable';
import useAsync from '../../hooks/use-async';
import SocialForm from '../SocialForm';
import PasswordUtil from '../../utils/password';

/** @type {import('../..').SecretType} */
const DEFAULT_SECRET = {
  name: '',
  account: '',
  password: '',
  phone: '',
  socialList: [],
  decoded: true
};

/**
 * Field组件的 事件-value 转换函数
 */
const MapFieldChangeEventToValue = ({ detail }) => detail;
/**
 * 表单配置，基于此 render 出表单
 * 依赖于 Field组件
 * @typedef {{
 * id: String;
 * name: String;
 * validators: import('../..').ValidationFunction[];
 * placeholder?: String;
 * buttonSlot?: (onClick) => React.ReactElement;
 * mapEventToValue?: (e) => any;
 * required: boolean;
 * }} FormConfig
 */
/** @type {{[K in keyof import('../..').SecretType]: FormConfig}} */
const MAIN_INFO_FORM_CONFIGS = {
  name: {
    id: 'name',
    name: '名称',
    validators: [Validators.required('名称不能为空')],
    placeholder: '一个用于区分的名字',
    mapEventToValue: MapFieldChangeEventToValue,
    required: true
  },
  account: {
    id: 'account',
    name: '账号',
    required: true,
    validators: [Validators.required('账号不能为空')],
    placeholder: '登陆时的用户名',
    mapEventToValue: MapFieldChangeEventToValue
  },
  password: {
    id: 'password',
    name: '密码',
    required: true,
    placeholder: '密码会被加密保存',
    validators: [
      Validators.required('密码不能为空'),
      value => value?.length < 6 && '密码长度小于6'
    ],
    mapEventToValue: MapFieldChangeEventToValue,
    buttonSlot: onClick => (
      <View slot="button">
        <Button type="info" bindclick={onClick} size="small" plain hairline>
          随机生成
        </Button>
      </View>
    )
  },
  phone: {
    id: 'phone',
    name: '手机',
    required: false,
    validators: [
      value => {
        const isEmpty = !value;
        const validPhoneNumber = /^1[0-9]{10}$/.test(value);
        return (isEmpty || validPhoneNumber) ? undefined : '手机号码不正确';
      }
    ],
    placeholder: '该账号绑定的手机号码',
    mapEventToValue: MapFieldChangeEventToValue
  }
};

/**
 * @type {import('../..').MakeForm<import('../..').SecretType>}
 */
const makeSecretForm = makeForm;
const useForm = makeSecretForm(
  Object.keys(MAIN_INFO_FORM_CONFIGS)
    .filter(key => !!MAIN_INFO_FORM_CONFIGS[key].validators)
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: MAIN_INFO_FORM_CONFIGS[key]?.validators
      }),
      {}
    )
);

/**
 * @export
 * @param {{
 * secret: import("../..").SecretRecord;
 * onSubmit: (secret: import("../..").SecretRecord) => void;
 * }} props
 */
export default function({ secret, onSubmit }) {
  const log = useLogger('SecretForm');
  const [secretForm, errors, onChanges, formValid] = useForm(
    secret?.toJS() || DEFAULT_SECRET
  );
  const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);

  /** 是新建么 */
  const isNew = useMemo(() => !secret, [secret]);
  /** 点击提交按钮 */
  const handleSubmit = useCallback(async () => {
    await onSubmit?.(secretForm);
    showToast({
      title: `${isNew ? '新建' : '修改'}密码项成功`,
      icon: 'success'
    });
  }, [onSubmit, secretForm, isNew]);

  /** 提交错误 */
  useEffect(() => {
    submitError &&
      showToast({
        title: `出错了（${submitError?.message}），请重试`,
        icon: 'none'
      });
  }, [submitError]);

  const {
    result: submitResult,
    loading: submitLoading,
    error: submitError,
    call: callSubmit
  } = useAsync(handleSubmit, { autoCall: false, debounce: true });
  /**
   *
   * @type {{[K in keyof import('../..').SecretType]: any}}
   * */
  const MAIN_INFO_FORM_ON_CLICKS = useMemo(() => {
    return {
      password: () => {
        const randomPassword = PasswordUtil.generate();
        log(randomPassword);
        onChanges.get('password')?.(randomPassword);
      }
    };
  }, [onChanges]);
  /**
   * 主信息表单
   */
  const mainInfoForm = useMemo(() => {
    return Object.keys(MAIN_INFO_FORM_CONFIGS).map(key => {
      /**
       * 当前 表单项的配置
       * @type {FormConfig} */
      const config = MAIN_INFO_FORM_CONFIGS[key];

      /** 当前项的值 */
      const value = secretForm.get(key);

      // 事件处理
      const handler = e => {
        // 使用事件转换函数得到值后，直接onChange
        onChanges.get(key)?.(config.mapEventToValue?.(e));
      };
      return (
        <Field
          key={key}
          clearable
          required={config.required}
          placeholder={config.placeholder}
          label={config.name}
          value={value}
          error={!!errors.get(key)?.length}
          error-message={errors.get(key)?.join(' ')}
          bindchange={handler}
        >
          {config.buttonSlot?.(MAIN_INFO_FORM_ON_CLICKS[key])}
        </Field>
      );
    });
  }, [
    ...Object.keys(MAIN_INFO_FORM_CONFIGS).map(key => secretForm.get(key)),
    ...Object.keys(MAIN_INFO_FORM_CONFIGS).map(key => errors.get(key)),
    ...Object.keys(MAIN_INFO_FORM_CONFIGS).map(key => onChanges.get(key)),
    MAIN_INFO_FORM_ON_CLICKS
  ]);

  /**
   * 社交账号
   */
  const socialList = useMemo(() => {
    /** @type {import('immutable').RecordOf<import('../..').SocialType[]>} */
    const socialList = secretForm.get('socialList');
    log(socialList);
    const handleDeleteItem = socialItem => {
      const onListChange = onChanges.get('socialList');
      const index = socialList.findIndex(
        item => item.get('_id') === socialItem.get('_id')
      );
      onListChange(socialList.delete(index));
    };
    return (
      <>
        {socialList?.map?.(item => (
          <SocialItem socialItem={item} onDelete={handleDeleteItem} />
        ))}
        <Cell>
          <View>
            <Button
              plain
              size="small"
              type="info"
              bindclick={() => setShowAddSocialDialog(true)}
            >
              新增
            </Button>
          </View>
        </Cell>
      </>
    );
  }, [secretForm.get('socialList'), onChanges.get('socialList')]);

  const addSocialDialog = useMemo(() => {
    const handleSubmit = social => {
      const socialList = secretForm.get('socialList');
      const onSocialListChange = onChanges.get('socialList');
      onSocialListChange?.(socialList.push(social));
      setShowAddSocialDialog(false);
    };
    if (showAddSocialDialog) {
      return (
        <Dialog
          show={true}
          use-slot
          show-confirm-button={false}
          close-on-click-overlay={true}
          title="绑定社交"
        >
          <SocialForm onSubmit={handleSubmit} />
        </Dialog>
      );
    } else {
      return null;
    }
  }, [
    secretForm.get('socialList'),
    onChanges.get('socialList'),
    showAddSocialDialog
  ]);

  /** 提交按钮 */
  const submitButton = useMemo(() => {
    return (
      <Button
        type="primary"
        block
        icon="passed"
        disabled={!formValid}
        loading={submitLoading}
        bindclick={callSubmit}
      >
        确定
      </Button>
    );
  }, [onSubmit, secretForm, formValid, submitLoading, callSubmit]);

  return (
    <Panel custom-class={styles.panel}>
      <CellGroup title="主要信息">{mainInfoForm}</CellGroup>
      <CellGroup title="社交账号">{socialList}</CellGroup>
      {addSocialDialog}
      <View className={styles.submitButtonWrapper}>{submitButton}</View>
    </Panel>
  );
}
