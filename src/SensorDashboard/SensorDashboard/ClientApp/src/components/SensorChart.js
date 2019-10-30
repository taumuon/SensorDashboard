import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment'

function getPoint(item) {
    return { time: new Date(item.timestamp).getTime(), value: item.value };
}

const maxNumMsgs = 10;

export default function SensorChart(props) {

    let [seriesData, setSeriesData] = useState([]);

    let [prevMsg, setPrevMsg] = useState(null);

    const [chartKey, setChartKey] = useState(0);

    if (props.latestMsg !== prevMsg) {
        setPrevMsg(props.latestMsg);
        let newPoint = getPoint(props.latestMsg);
        const currentSeriesData = seriesData;
        // update key to force chart re-render. https://github.com/recharts/recharts/issues/655
        setChartKey(Math.random());
        setSeriesData(currentSeriesData.concat([newPoint]).slice(-maxNumMsgs));
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
                <LineChart width={275} height={200} data={seriesData}
                    margin={{ top: 5, right: 30, left: -5, bottom: 5 }}>
                    <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']}
                        key={chartKey}
                        tickCount={10} interval='preserveStartEnd'
                        tickFormatter={(unixTime) => moment(unixTime).format('ss.S')} />
                    <YAxis width={50} />
                    <Line type="monotone" dataKey="value"
                        stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    );
}

