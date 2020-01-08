import {createContainer} from 'unstated-next';
import {useState} from 'react';

const useApp = () => {
    const [app, setApp] = useState({});
    return [app];
}

export const AppStore = createContainer(useApp);

