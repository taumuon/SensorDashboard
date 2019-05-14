import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment'

export class SensorChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestMsg: null,
            sensorData: []
        };
    }

    static getPoint(item) {
        return { time: new Date(item.timestamp).getTime(), value: item.value };
    }

    static getNewState(state, item) {
        let newPoint = SensorChart.getPoint(item);

        let sensorDataArr = state.sensorData.concat([newPoint]);
        const maxNumMsgs = 50;
        sensorDataArr = sensorDataArr.slice(-maxNumMsgs);

        return { sensorData: sensorDataArr, latestMsg: item };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.latestMsg !== state.latestMsg) {
            let item = props.latestMsg;

            if (item === null) { return null; }

            return SensorChart.getNewState(state, item);
        }
        return null;
    }

    render() {
        if (this.state.latestMsg == null) {
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.sensorName}</h5>
                        <p>-</p>
                     </div>
                </div>
                );
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.sensorName}</h5>
                    <LineChart width={275} height={200} data={this.state.sensorData}
                               margin={{ top: 5, right: 30, left: -5, bottom: 5 }}>
                        <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']}
                               tickCount={10} interval={1}
                               tickFormatter={(unixTime) => moment(unixTime).format('ss.S')}/>
                        <YAxis width={50} />
                        <Line type="monotone" dataKey="value"
                              stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>
        );
    }
}

export default SensorChart