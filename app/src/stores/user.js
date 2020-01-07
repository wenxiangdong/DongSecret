import {createContainer} from 'unstated-next';
import {useState} from 'react';

const useUser = () => {
    const [user, setUser] = useState();
    return [user];
}

export const UserContainer = createContainer(useUser);

