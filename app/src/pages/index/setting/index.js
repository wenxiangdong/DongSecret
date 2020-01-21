import React, { useMemo, useCallback } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.module.less';
import UserInfo from '../../../components/UserInfo';
import Background from '../../../components/common/Background';
import Icon from '@vant/weapp/dist/icon';
import { ROUTES } from '../../../constants/index';

/**
 * @typedef {{name: String; link: String; icon: String;}} MenuType
 */

/**
 * 菜单项
 * @param {{menu: MenuType}} props
 */
const MenuItem = props => {
  const { menu: { name, link, icon } = {} } = props;
  const handleClick = useCallback(() => {
    navigateTo({
      url: link
    });
  }, [link]);
  return (
    <>
      <View className={styles.menu} onClick={handleClick}>
        <Icon name={icon} />
        <View className={styles.name}>{name}</View>
      </View>
      <View className={styles.border} />
    </>
  );
};

/**
 * 菜单配置列表
 * @type {MenuType[]}
 * */
const MENU_LIST = [
  {
    name: 'one password',
    link: ROUTES.UPDATE_PASSWORD(),
    icon: 'lock'
  },
  {
    name: '关于',
    link: ROUTES.ABOUT(),
    icon: 'info'
  }
];

export default () => {
  const menuList = useMemo(() => {
    return (
      <View className={styles.menuList}>
        {MENU_LIST.map(menu => (
          <MenuItem key={menu.name} menu={menu} />
        ))}
      </View>
    );
  }, []);
  return (
    <View className={styles.wrapper}>
      <UserInfo />
      {menuList}
      <Background className={styles.background} />
    </View>
  );
};
