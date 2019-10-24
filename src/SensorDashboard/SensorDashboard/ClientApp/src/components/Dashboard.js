import React from 'react';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withConnection from './SensorConnection.js';
import withSensorMinMax from './SensorMinMax.js';

import useHubConnect from './useHubConnect.js';

import './Dashboard.css';

const SensorValueWithConnection = withConnection(SensorValue);
const SensorValueWithConnectionMinMax = withConnection(withSensorMinMax(SensorValue));
const SensorChartWithConnection = withConnection(SensorChart);

export function Dashboard(props) {
    const hubConnection = useHubConnect('/streamHub');

    return (
        <div className='grid-container'>
            <SensorValueWithConnection className='grid-item' {...props} sensorName='temperature_room_1' hubConnection={hubConnection} />
            <SensorValueWithConnectionMinMax className='grid-item' {...props} sensorName='temperature_room_2' hubConnection={hubConnection} />
            <SensorValueWithConnection className='grid-item' {...props} sensorName='humidity_room_2' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} sensorName='temperature_room_1' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} sensorName='temperature_room_2' hubConnection={hubConnection} />
            <SensorChartWithConnection className='grid-item' {...props} sensorName='humidity_room_2' hubConnection={hubConnection} />
        </div>
    );
}
