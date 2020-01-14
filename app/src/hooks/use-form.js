import {useState, useMemo} from 'react';
import { fromJS } from 'immutable';


export default function(initValue, validations = {}) {
    /**
     * @type {[
     * import('..').Record<any>, 
     * React.Dispatch<React.SetStateAction<import('..').Record<any>>>
     * ]}
     */
    const [formState, setFormState] = useState(fromJS(initValue));
    const handlers = useMemo(() => 
        Object.keys(initValue).reduce((accHandlers, curKey) => {
            const handler = ({detail}) => {
                setFormState(preFormState => preFormState.set(curKey, detail));
            };
            return {...accHandlers, [curKey]: handler};
        }, {}),
    []);

    return [formState, handlers];
}