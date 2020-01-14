import React from 'react';

import useSubscribeSensorStream from './useSubscribeSensorStream.js';

// TOOD: handle sharing of connection data for different components with the same sensor name
export default function withSensorConnection(WrappedComponent) {
    return props => {
        let sensorData = useSubscribeSensorStream(props.hubConnection, 'StartListening', props.sensorName);

        return <WrappedComponent {...props} latestMsg={sensorData.latestMsg} />;
    };
};