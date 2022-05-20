import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View } from 'remax/wechat';
import Tabbar from '@vant/weapp/lib/tabbar';
import TabbarItem from '@vant/weapp/lib/tabbar-item';
import Transition from '@vant/weapp/lib/transition';
import config from './config';
import styles from './index.module.less';

export default props => {
  const prevTabRef = useRef(-1);
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTabbar = useCallback(({ detail }) => {
    setCurrentTab(prevTab => ((prevTabRef.current = prevTab), detail));
  }, []);

  const components = useMemo(() => {
    const { pages } = config;
    const getTransitionName = index =>
      index > prevTabRef.current ? 'slide-right' : 'slide-left';
    return (
      <>
        {pages.map((page, index) => {
          const Com = page.component;
          const transition = getTransitionName(index);
          return (
            <Transition
              key={page.name}
              name={transition}
              duration={{ enter: 500, leave: 0 }}
              show={index === currentTab}
              enter-class={styles.tabEnterActive}
            >
              <View className={styles.tabItem}>
                <Com {...props} />
              </View>
            </Transition>
          );
        })}
      </>
    );
  }, [currentTab, props]);
  return (
    <View>
      {components}
      <View className={styles.gap} />
      <Tabbar
        z-index={20}
        active={currentTab}
        fixed={true}
        border={true}
        active-color={config.selectedColor}
        bindchange={handleChangeTabbar}
      >
        {config.pages.map(item => (
          <TabbarItem key={item.name} icon={item.icon} />
        ))}
      </Tabbar>
    </View>
  );
};
