import React from 'react';

// connection higher-order component
export default function withConnectionIndicator(WrappedComponent) {
    return props => {

        if (props.hubConnection === null || props.hubConnection === undefined) {
            return (
                <div>
                    <p>Connecting...</p>
                </div>
            );
        }

        return (
            <div>
                <WrappedComponent {...props} />
            </div>
        );
    };
}
