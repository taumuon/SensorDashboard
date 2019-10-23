import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withConnection from './SensorConnection.js';
import withSensorMinMax from './SensorMinMax.js';

import './Dashboard.css';

const SensorValueWithConnection = withConnection(SensorValue);
const SensorValueWithConnectionMinMax = withConnection(withSensorMinMax(SensorValue));
const SensorChartWithConnection = withConnection(SensorChart);

export function Dashboard(props) {
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        const rawHubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/streamHub")
            //.configureLogging(signalR.LogLevel.Trace)
            .build();

        console.log("connecting to hub");

        rawHubConnection.start()
            .then(() => {
                console.log('Connection Started!');
                setHubConnection(rawHubConnection);
            })
            .catch(err => console.log('Error while estabilishing connection: ' + err));
    }, []);

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
