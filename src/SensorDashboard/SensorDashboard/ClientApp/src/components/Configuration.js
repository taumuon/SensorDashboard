import React from 'react';

export function Configuration(props) {
    let contents = props.loadingConfig
        ? <p><em>Loading...</em></p>
        : <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Host Device</th>
                    <th>Units</th>
                </tr>
            </thead>
            <tbody>
                {props.sensorConfig.map(sensor =>
                    <tr key={sensor.name}>
                        <td>{sensor.name}</td>
                        <td>{sensor.manufacturer}</td>
                        <td>{sensor.hostDevice}</td>
                        <td>{sensor.sensorUnits}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1>Sensor Configuration</h1>
            {contents}
        </div>
    );
}

