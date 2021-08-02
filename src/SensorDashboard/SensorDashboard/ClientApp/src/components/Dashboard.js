import React from 'react';

import SensorValue from './SensorValue.js';
import SensorChart from './SensorChart.js';

import withDashboardItemCard from './DashboardItemCard.js';
import withConnectionIndicator from './SensorConnectionIndicator.js';
import withSensorMinMax from './SensorMinMax.js';
import withSensorConnection from './SensorConnection.js';

import useHubConnect from './useHubConnect.js';

import './Dashboard.css';

const SensorValueWithConnection = withDashboardItemCard(withConnectionIndicator(SensorValue));
const SensorChartWithConnection = withDashboardItemCard(withConnectionIndicator(SensorChart));
const SensorValueWithConnectionMinMax = withSensorMinMax(withDashboardItemCard(withConnectionIndicator(SensorValue)));
const SensorChartWithConnectionMinMax = withSensorMinMax(withDashboardItemCard(withConnectionIndicator(SensorChart)));

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
        { sensorName: "temperature_room_2", chartType: SensorTypes.CHART, minMax: true },
        { sensorName: "humidity_room_2", chartType: SensorTypes.CHART, minMax: true }
    ];

export function Dashboard(props) {
    const hubConnection = useHubConnect('/streamHub');

    return (
        <div className='grid-container'>
            {
                sensorConfigItems.map((sci, index) => {
                    // NOTE: can't do this, as it seems a new instance of the chart is created, and the useState hook
                    //  doesn't realise it's really the same instance - the seriesData is always empty on render.
                    // let component = sci.chartType === SensorTypes.VALUE
                    //    ? SensorValueWithConnection
                    //    : SensorChartWithConnection;
                    //let component = sci.chartType === SensorTypes.VALUE
                    //    ? withDashboardItemCard(withConnectionIndicator(SensorValue))
                    //    : withDashboardItemCard(withConnectionIndicator(SensorChart));
                    //
                    //if (sci.minMax) {
                    //    component = withSensorMinMax(component);
                    //}

                    let component = sci.minMax
                        ? (sci.chartType === SensorTypes.VALUE ? SensorValueWithConnectionMinMax : SensorChartWithConnectionMinMax)
                        : (sci.chartType === SensorTypes.VALUE ? SensorValueWithConnection : SensorChartWithConnection);

                    component = withSensorConnection(component);

                    return component({ ...props, className: 'grid-item', key: index, sensorName: sci.sensorName, hubConnection: hubConnection });
                })
            }
        </div>
    );
}