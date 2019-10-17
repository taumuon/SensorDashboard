import React, { Component } from 'react';
import * as signalR from '@microsoft/signalr';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withConnection from './SensorConnection.js';
import withSensorSeries from './SensorSeries.js';
import withSensorMinMax from './SensorMinMax.js';

import './Dashboard.css';

const SensorValueWithConnection = withConnection(SensorValue);
const SensorValueWithConnectionMinMax = withConnection(withSensorMinMax(SensorValue));
const SensorChartWithConnection = withConnection(withSensorSeries(SensorChart));

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rawHubConnection: null,
            hubConnection: null // Set when connected
        };
    }

    componentDidMount = () => {
        const rawHubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/streamHub"/*, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }*/)
            //.configureLogging(signalR.LogLevel.Trace)
            .build();
        this.setState({ rawHubConnection }, () => {
            console.log("connecting to hub");
            this.state.rawHubConnection.start()
                .then(() => {
                    console.log('Connection Started!');
                    this.setState({ hubConnection: rawHubConnection });
                })
                .catch(err => console.log('Error while estabilishing connection: ' + err));
        });
    }

    render() {
        return (
            <div className='grid-container'>
                <SensorValueWithConnection className='grid-item' {...this.props} sensorName='temperature_room_1' hubConnection={this.state.hubConnection} />
                <SensorValueWithConnectionMinMax className='grid-item' {...this.props} sensorName='temperature_room_2' hubConnection={this.state.hubConnection} />
                <SensorValueWithConnection className='grid-item' {...this.props} sensorName='humidity_room_2' hubConnection={this.state.hubConnection} />
                <SensorChartWithConnection className='grid-item' {...this.props} sensorName='temperature_room_1' hubConnection={this.state.hubConnection} />
                <SensorChartWithConnection className='grid-item' {...this.props} sensorName='temperature_room_2' hubConnection={this.state.hubConnection} />
                <SensorChartWithConnection className='grid-item' {...this.props} sensorName='humidity_room_2' hubConnection={this.state.hubConnection} />
            </div>
        );
    }
}