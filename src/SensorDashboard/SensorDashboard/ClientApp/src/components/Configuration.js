import React, { Component } from 'react';

export class Configuration extends Component {
    static displayName = Configuration.name;

    static renderSensorsTable(sensorConfig) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Host Device</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {sensorConfig.map(sensor =>
                        <tr key={sensor.name}>
                            <td>{sensor.name}</td>
                            <td>{sensor.manufacturer}</td>
                            <td>{sensor.hostDevice}</td>
                            <td>{sensor.sensorUnits}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.props.loadingConfig
            ? <p><em>Loading...</em></p>
            : Configuration.renderSensorsTable(this.props.sensorConfig);

        return (
            <div>
                <h1>Sensor Configuration</h1>
                {contents}
            </div>
        );
    }
}
