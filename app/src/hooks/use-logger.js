import {useEffect, useCallback} from 'react';

export default (tag, options={auto: true}) => {
    const log = useCallback((...content) => {
        const head = `[${tag}] ${new Date().toTimeString()}`;
        const tail = '---------------------------------';
        [head, ...content, tail].forEach(item => console.log(item));
    }, [tag]);
    useEffect(() => {
        if (options.auto) {
            log('render');
        }
    });
    return log;
}