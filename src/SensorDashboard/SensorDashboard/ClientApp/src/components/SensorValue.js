import React from 'react';

export default function SensorValue(props) {
    if (props.latestMsg == null) {
        return (
            <h5 className="display-3">-</h5>
        );
    }

    return (
        <h5 className="display-4">{props.latestMsg.value.toFixed(2)} <small>{props.units}</small></h5>
    );
}
