import './app.less';
import React from 'react';
import { UserStore } from './stores/user';
import { AppStore } from './stores/app';
import { composeContainerProviders } from './utils/container-provider-helper';
import { PasswordStore } from './stores/password';

const StoreProvider = composeContainerProviders(
    {
        ContainerProvider: UserStore.Provider,
        initState: {},
    },
    {
        ContainerProvider: AppStore.Provider,
        initState: {},
    },
    {
        ContainerProvider: PasswordStore.Provider,
        initState: undefined,
    },
)
const App = props => {
    return (
        <StoreProvider>
            {props.children}
        </StoreProvider>
    );
};

export default App;
