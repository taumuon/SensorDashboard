import React, { Component } from 'react';

// connection higher-order component
export default function withSensorMinMax(WrappedComponent) {
    class WithSensorMinMax extends Component {
        constructor(props) {
            super(props);

            this.state = {
                min: undefined,
                max: undefined
            };
        }

        static getDerivedStateFromProps(props, state) {
            if (props.latestMsg) {
                let item = props.latestMsg;

                if (item === null) { return; }

                let stateMin = (state.min === undefined) ? Number.MAX_SAFE_INTEGER : state.min;
                let stateMax = (state.max === undefined) ? Number.MIN_SAFE_INTEGER : state.max;

                let min = Math.min(stateMin, item.value);
                let max = Math.max(stateMax, item.value);

                if (min === state.min && max === state.max) {
                    return null;
                }

                return { min: min, max: max };
            }
            return null;
        }

        render() {
            return (
                <WrappedComponent min={this.state.min} max={this.state.max} {...this.props} />
            );
        }
    }

    WithSensorMinMax.displayName = `WithSensorMinMax(${getDisplayName(WrappedComponent)})`;

    return WithSensorMinMax;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'SensorMinMaxComponent';
}
