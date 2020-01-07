import React from 'react';
/**
 * 
 * @param  {...{ContainerProvider: any, initState: any}} providers 
 */
export const composeContainerProviders = (...providers) => {
    return function ComposedContainerProvider(props) {
        return providers.reduceRight((children, provider) => {
            const {ContainerProvider, initState} = provider;
            return (
                <ContainerProvider initState={initState}>
                    {children}
                </ContainerProvider>)
        }, props.children);
    }
}