import React, { Component } from 'react';

// series data higher-order component
export default function withSensorSeries(WrappedComponent) {
    class WithSensorSeries extends Component {
        constructor(props) {
            super(props);

            this.state = {
                latestMsg: null,
                sensorData: []
            };
        }

        static getPoint(item) {
            return { time: new Date(item.timestamp).getTime(), value: item.value };
        }

        static getNewState(state, item) {
            let newPoint = WithSensorSeries.getPoint(item);

            let sensorDataArr = state.sensorData.concat([newPoint]);
            const maxNumMsgs = 50;
            sensorDataArr = sensorDataArr.slice(-maxNumMsgs);

            return { sensorData: sensorDataArr, latestMsg: item };
        }

        static getDerivedStateFromProps(props, state) {
            if (props.latestMsg !== state.latestMsg) {
                let item = props.latestMsg;

                if (item === null) { return null; }

                return WithSensorSeries.getNewState(state, item);
            }
            return null;
        }

        render() {
            return (
                <WrappedComponent latestMsg={this.state.latestMsg} sensorData={this.state.sensorData} {...this.props} />
            );
        }
    }

    WithSensorSeries.displayName = `WithSensorSeries(${getDisplayName(WrappedComponent)})`;

    return WithSensorSeries;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'SensorSeriesComponent';
}