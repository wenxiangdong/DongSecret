import { useEffect } from "react";
import { setNavigationBarTitle, setNavigationBarColor } from "remax/wechat";
/**
 * 设置小程序导航栏
 * @param {{
 * title: String;
 * backgroundColor?: String;
 * frontColor?: String;
 * }} config
 */
export default function(config) {
    const {title, backgroundColor, frontColor} = config;
    useEffect(() => {
        !!title && setNavigationBarTitle({
            title,
        });
    }, [title]);

    useEffect(() => {
        [backgroundColor, frontColor].every(Boolean) && setNavigationBarColor({
            backgroundColor,
            frontColor,
        });
    }, [backgroundColor, frontColor]);
}