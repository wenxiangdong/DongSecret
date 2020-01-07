import './app.less';
import React from 'react';
import { UserContainer } from './stores/user';
import { AppContainer } from './stores/app';
import { composeContainerProviders } from './utils/container-provider-helper';

const StoreProvider = composeContainerProviders(
    {
        ContainerProvider: UserContainer.Provider,
        initState: {},
    },
    {
        ContainerProvider: AppContainer.Provider,
        initState: {},
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
