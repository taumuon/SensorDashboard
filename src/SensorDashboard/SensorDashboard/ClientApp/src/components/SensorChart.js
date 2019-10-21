import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment'

function getPoint(item) {
    return { time: new Date(item.timestamp).getTime(), value: item.value };
}

const maxNumMsgs = 50;

function getNewState(state, item) {
    let newPoint = getPoint(item);

    let sensorDataArr = state.sensorData.concat([newPoint]).slice(-maxNumMsgs);

    return { sensorData: sensorDataArr, latestMsg: item };
}

export default function SensorChart(props) {

    let [seriesData, setSeriesData] = useState({
        latestMsg: null,
        sensorData: []
    });

    let [prevMsg, setPrevMsg] = useState(null);

    if (props.latestMsg !== prevMsg) {
        setPrevMsg(props.latestMsg);
        setSeriesData(getNewState(seriesData, props.latestMsg));
    }

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
                <LineChart width={275} height={200} data={seriesData.sensorData}
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

