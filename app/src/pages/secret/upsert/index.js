import { View } from "remax/wechat";
import React, { useMemo } from 'react';
import useNavigationBar from "../../../hooks/use-navigation-bar";



export default function({location: {query: {id} = {}}}) {
    const navigationBarTitle = useMemo(() => !id ? '新建秘密' : '修改秘密', [id]);
    useNavigationBar({title: navigationBarTitle});

    return (
        <View>upsert</View>
    );
}