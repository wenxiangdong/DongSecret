import { useState, useEffect, useCallback, useRef } from "react";
import useLogger from "./use-logger";

const DEBOUNCE_TIMEOUT = 500;
/**
 * 
 * @param {() => Promise} asyncFn 
 * @param {{
 *  autoCall: boolean;  // 是否自动调用
 *  debounce: boolean;   // 是否防抖
 * }} options 
 */
export default function (asyncFn, options = {autoCall: true, debounce: false}) {
    const [loading, setLoading] = useState(options.autoCall);
    const [result, setResult] = useState(undefined);
    const [error, setError] = useState(undefined);
    const timerRef = useRef(undefined);
    const log = useLogger('use async', {auto: false});

    const call = useCallback(async () => {
        setResult(undefined);
        setError(undefined);
        setLoading(true);
        clearTimeout(timerRef.current);
        const request = async () => {
            log('call start');
            try {
                const data = await asyncFn();
                log('call result', data);
                setResult(data);
            } catch (error) {
                log('call error', error);
                setError(error);
            } finally {
                setLoading(false);
                log('call end')
            }
        }
        if (options.debounce) {
            timerRef.current = setTimeout(() => {
                request();
            },DEBOUNCE_TIMEOUT);
        } else {
            request();
        }
    }, [asyncFn]);

    useEffect(() => {
        if (options.autoCall) {
            call();
        }
    }, []);

    return {
        loading,
        error,
        result,
        call,
    };
}