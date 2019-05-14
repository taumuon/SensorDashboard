import React, { Component } from 'react';

// connection higher-order component
export default function withConnection(WrappedComponent) {
    class WithConnection extends Component {
        constructor(props) {
            super(props);

            this.state = {
                latestMsg: null,
                streamSubscription: null,
                hubConnection: null
            };
        }

        componentDidUpdate() {
            if ((this.state.hubConnection !== this.props.hubConnection)
                && ((this.props.hubConnection !== undefined))) {
                this.setState({ hubConnection: this.props.hubConnection });
                this.start();
            }
        }

        componentWillUnmount() {
            this.stop();
        }

        start() {
            let streamSubscription = this.props.hubConnection.stream('StartListening', this.props.sensorName)
                .subscribe({
                    next: (item) => {
                        this.setState({ latestMsg: item });
                    },
                    complete: () => {
                        console.log('completed');
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            this.setState({ streamSubscription });
        }

        stop() {
            if (this.state.streamSubscription != null) {
                this.state.streamSubscription.dispose();
            }
            this.setState({ streamSubscription: null });
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
                    <WrappedComponent latestMsg={this.state.latestMsg} {...this.props} />
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
