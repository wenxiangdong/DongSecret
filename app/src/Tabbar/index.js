import React, { useState, useMemo, useRef, useCallback } from 'react';
import {View} from 'remax/wechat';
import Tabbar from '@vant/weapp/dist/tabbar';
import TabbarItem from '@vant/weapp/dist/tabbar-item';
import config from './config';
import styles from './index.module.less';

export default (props) => {
    const prevTabRef = useRef(-1);
    const [currentTab,setCurrentTab] = useState(0);
    const handleChangeTabbar = useCallback(({detail}) => {
        setCurrentTab(prevTab => (prevTabRef.current = prevTab, detail));
    }, []);

    const component = useMemo(() => {
        const nextPage = config.pages[currentTab];
        const transitionName = nextPage > prevTabRef.current ? 'fade-right' : 'fade-left';
        if (nextPage) {
            const Com = nextPage.component;
            return (
                // <Transition show={true} name={transitionName}>
                    <Com {...props} />
                // </Transition>
            );
        }
        return null;
    } , [currentTab, props]);
    return (
        <View>
            {component}
            <View className={styles.gap} />
            <Tabbar 
            active={currentTab}
            fixed={true} 
            border={true}
            active-color={config.selectedColor}
            bindchange={handleChangeTabbar}>
                {
                    config.pages.map((item) => (
                        <TabbarItem
                        key={item.name}
                        icon={item.icon}/>
                    ))
                }
            </Tabbar>
        </View>
    );
}