import React from 'react';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withDashboardItemCard from './DashboardItemCard.js';
import withConnectionIndicator from './SensorConnectionIndicator.js';
import withSensorMinMax from './SensorMinMax.js';

import useHubConnect from './useHubConnect.js';

import useSubscribeSensorStream from './useSubscribeSensorStream.js';

import './Dashboard.css';

const SensorValueWithConnection = withDashboardItemCard(withConnectionIndicator(SensorValue));
const SensorChartWithConnection = withDashboardItemCard(withConnectionIndicator(SensorChart));

const SensorTypes = Object.freeze({
    VALUE: 'value',
    CHART: 'chart'
});

// TODO: these will be stored server-side, and will be dynamically updatable
const sensorConfigItems =
    [
        { sensorName: "temperature_room_1", chartType: SensorTypes.VALUE, minMax: false },
        { sensorName: "temperature_room_2", chartType: SensorTypes.VALUE, minMax: true },
        { sensorName: "humidity_room_2", chartType: SensorTypes.VALUE, minMax: false },
        { sensorName: "temperature_room_1", chartType: SensorTypes.CHART, minMax: false },
        { sensorName: "temperature_room_2", chartType: SensorTypes.CHART, minMax: false },
        { sensorName: "humidity_room_2", chartType: SensorTypes.CHART, minMax: true }
    ];

export function Dashboard(props) {
    const hubConnection = useHubConnect('/streamHub');

    const sensorNames = [...new Set(sensorConfigItems.map(x => x.sensorName))];

    let sensorDatas = {};

    for (const sensorName of sensorNames)
    {
        // TODO: breaks rule of hooks even if order maintained? How to cope with dashboard config (layout) changes?
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let sensorData = useSubscribeSensorStream(hubConnection, 'StartListening', sensorName);
        sensorDatas[sensorName] = sensorData;
    }

    return (
        <div className='grid-container'>
            {
                sensorConfigItems.map((sci, index) => {
                    let component = sci.chartType === SensorTypes.VALUE
                        ? SensorValueWithConnection
                        : SensorChartWithConnection;

                    // NOTE: can't do this, as it seems a new instance of the chart is created, and the useState hook
                    //  doesn't realise it's really the same instance - the seriesData is always empty on render.
                    //let component = sci.chartType === SensorTypes.VALUE
                    //    ? withDashboardItemCard(withConnectionIndicator(SensorValue))
                    //    : withDashboardItemCard(withConnectionIndicator(SensorChart));

                    if (sci.minMax) {
                        component = withSensorMinMax(component);
                    }

                    return component({ ...props, className: 'grid-item', key: index, latestMsg: sensorDatas[sci.sensorName].latestMsg, sensorName: sci.sensorName, hubConnection: hubConnection });
                })
            }
        </div>
    );
}