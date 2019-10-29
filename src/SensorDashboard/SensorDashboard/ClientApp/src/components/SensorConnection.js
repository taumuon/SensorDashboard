import React, { Component } from 'react';

// connection higher-order component
export default function withConnection(WrappedComponent) {
    class WithConnection extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            if (this.props.hubConnection === null || this.props.hubConnection === undefined) {
                return (
                    <div>
                        <p>Connecting...</p>
                    </div>
                );
            }

            return (
                <div>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    }

    WithConnection.displayName = `WithConnection(${getDisplayName(WrappedComponent)})`;

    return WithConnection;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'ConnecctionComponent';
}
