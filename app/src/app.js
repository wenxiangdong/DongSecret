import './app.less';
import React from 'react';
import { UserStore } from './stores/user';
import { AppStore } from './stores/app';
import { composeContainerProviders } from './utils/container-provider-helper';
import { PasswordStore } from './stores/password';
import { fromJS } from 'immutable';
import { SecretsStore } from './stores/secrets';

const StoreProvider = composeContainerProviders(
    {
        ContainerProvider: UserStore.Provider,
        initState: fromJS({}),
    },
    {
        ContainerProvider: AppStore.Provider,
        initState: fromJS({}),
    },
    {
        ContainerProvider: PasswordStore.Provider,
        initState: undefined,
    },
    {
        ContainerProvider: SecretsStore.Provider,
    }
)
const App = props => {
    return (
        <StoreProvider>
            {props.children}
        </StoreProvider>
    );
};

export default App;
