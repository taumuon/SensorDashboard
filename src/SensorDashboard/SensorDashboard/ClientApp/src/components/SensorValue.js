import React from 'react';

export default function SensorValue(props) {
    let units = (props.sensorConfigMap !== undefined && props.sensorConfigMap[props.sensorName] !== undefined) ? props.sensorConfigMap[props.sensorName].sensorUnits : '';
    //let units = props.sensorConfigMap?.[props.sensorName]?.sensorUnits ?? '';
    if (props.latestMsg == null) {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.sensorName}</h5>
                    <h5 className="display-3">-</h5>
                </div>
            </div>
        );
    }

    const showFooter = props.min && props.max;
    let footerContent;
    if (showFooter) {
        footerContent = <p>Min: {props.min.toFixed(2)} {units} Max: {props.max.toFixed(2)} {units}</p>
    }
    else {
        footerContent = <p></p>
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.sensorName}</h5>
                <h5 className="display-4">{props.latestMsg.value.toFixed(2)} <small>{units}</small></h5>
            </div>
            {showFooter ?
                <div className="card-footer">
                    {footerContent}
                </div>
                : null
            }

        </div>
    );
}
