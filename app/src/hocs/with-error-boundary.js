import React from 'react';
import { View } from 'remax/wechat';
const DefaultErrorHandler = ({error}) => {
    return (
        <View>
            {error.message}
        </View>
    );
}
export default function(ErrorHandleComponent = DefaultErrorHandler) {
    return function(WrappedComponent) {
        return class extends React.Component {
            static getDerivedStateFromError(error) {
                return {error};
            }
            state = {
                error: undefined
            }
            componentDidCatch(error) {
                this.setState({error});
            }
            render() {
                const {error} = this.state;
                return !!error
                ? <ErrorHandleComponent error={error} />
                : <WrappedComponent {...this.props} />
            }
        }
    }
}