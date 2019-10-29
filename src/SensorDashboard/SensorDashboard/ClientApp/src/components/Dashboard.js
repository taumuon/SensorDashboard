import React from 'react';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withConnection from './SensorConnection.js';
import withSensorMinMax from './SensorMinMax.js';

import useHubConnect from './useHubConnect.js';

import useSubscribeSensorStream from './useSubscribeSensorStream.js';

import './Dashboard.css';

const SensorValueWithConnection = withConnection(SensorValue);
const SensorValueWithConnectionMinMax = withConnection(withSensorMinMax(SensorValue));
const SensorChartWithConnection = withConnection(SensorChart);


export function Dashboard(props) {
    const hubConnection = useHubConnect('/streamHub');

    // TODO: dictionary of sensor names
    let temperatureRoom1Msg = useSubscribeSensorStream(hubConnection, 'StartListening', 'temperature_room_1');
    let temperatureRoom2Msg = useSubscribeSensorStream(hubConnection, 'StartListening', 'temperature_room_2');
    let humidityRoom2Msg = useSubscribeSensorStream(hubConnection, 'StartListening', 'humidity_room_2');

    return (
        <div className='grid-container'>
            <SensorValueWithConnection className='grid-item' {...props} latestMsg={temperatureRoom1Msg.latestMsg} sensorName='temperature_room_1' hubConnection={hubConnection} />
            <SensorValueWithConnectionMinMax className='grid-item' {...props} latestMsg={temperatureRoom2Msg.latestMsg} sensorName='temperature_room_2' hubConnection={hubConnection} />
            <SensorValueWithConnection className='grid-item' {...props} latestMsg={humidityRoom2Msg.latestMsg} sensorName='humidity_room_2' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} latestMsg={temperatureRoom1Msg.latestMsg} sensorName='temperature_room_1' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} latestMsg={temperatureRoom2Msg.latestMsg} sensorName='temperature_room_2' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} latestMsg={humidityRoom2Msg.latestMsg} sensorName='humidity_room_2' hubConnection={hubConnection} />
        </div>
    );
}