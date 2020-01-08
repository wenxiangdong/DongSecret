import { useState, useEffect, useCallback } from "react";

/**
 * 
 * @param {() => Promise} asyncFn 
 * @param {{
 *  autoCall: boolean;  // 是否自动调用
 * }} options 
 */
export default function (asyncFn, options = {autoCall: true}) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(undefined);
    const [error, setError] = useState(undefined);

    const call = useCallback(async () => {
        setResult(undefined);
        setError(undefined);
        setLoading(true);
        try {
            const data = await asyncFn();
            setResult(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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