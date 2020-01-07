import {createContainer} from 'unstated-next';
import {useState} from 'react';

const useUser = () => {
    const [user, setUser] = useState();
    return [user];
}

export const UserStore = createContainer(useUser);

