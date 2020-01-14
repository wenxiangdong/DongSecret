import {useState, useMemo} from 'react';
import { fromJS } from 'immutable';
import useLogger from './use-logger';
/**
 * 
 * @param {*} validationMap 
 * @param {*} mapEventToValue 
 * @returns {import('..').UseForm}
 */
export const makeForm = (validationMap = {}, mapEventToValue = {}) => {
    const DEFAULT_GET_VALUE_FROM_EVENT = (value) => value;
    const useForm = (initState) => {
        const log = useLogger('useForm');
        /**
         * form state
         * @type {[
         * import('..').Record<any>, 
         * React.Dispatch<React.SetStateAction<import('..').Record<any>>>
         * ]}
         */
        const [formState, setFormState] = useState(fromJS(initState));
        /**
         * 表单验证错误
         * @typedef {import('..').Record<{[key: string]: string[]}>} FormErrorRecord
         * @type {[
         * FormErrorRecord, 
         * React.Dispatch<React.SetStateAction<FormErrorRecord>>
         * ]}
         */
        const [formError, setFormError] = useState(fromJS({}));
        /**
         * 事件处理
         */
        const handlers = useMemo(() => 
            fromJS(
                Object.keys(initState).reduce((accHandlers, curKey) => {
                    const handler = (event) => {
                        // 使用设置或者默认的 转换函数 取出事件中的值
                        const getValue = mapEventToValue[curKey] || DEFAULT_GET_VALUE_FROM_EVENT;
                        const curValue = getValue(event);

                        // 检测错误
                        /** @type {Array} */
                        const validations = validationMap[curKey] || [];
                        const errors = validations.map((validFunction) => validFunction(curValue)).filter(Boolean);

                        setFormState(preFormState => preFormState.set(curKey, curValue));
                        setFormError(preFormError => preFormError.set(curKey, errors));
                    };
                    return {...accHandlers, [curKey]: handler};
                }, {})
            ),
        []);
        return [formState, formError, handlers];
    }
    return useForm;
}


export const Validators = {
    required: (tip) => (value) => !!value ? undefined : tip,
}