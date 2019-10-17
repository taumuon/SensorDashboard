import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment'

export default function SensorChart(props) {
    if (props.latestMsg == null) {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.sensorName}</h5>
                    <p>-</p>
                </div>
            </div>
        );
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.sensorName}</h5>
                <LineChart width={275} height={200} data={props.sensorData}
                    margin={{ top: 5, right: 30, left: -5, bottom: 5 }}>
                    <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']}
                        tickCount={10} interval={1}
                        tickFormatter={(unixTime) => moment(unixTime).format('ss.S')} />
                    <YAxis width={50} />
                    <Line type="monotone" dataKey="value"
                        stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    );
}

