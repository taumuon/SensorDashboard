import React from 'react';

// Dashboard card item higher-order component
export default function withDashboardItemCard(WrappedComponent) {
    return props => {
        let units = (props.sensorConfigMap !== undefined && props.sensorConfigMap[props.sensorName] !== undefined) ? props.sensorConfigMap[props.sensorName].sensorUnits : '';
        //let units = props.sensorConfigMap?.[props.sensorName]?.sensorUnits ?? '';

        const showFooter = props.min && props.max;
        let footerContent;
        if (showFooter) {
            footerContent = <p>Min: {props.min.toFixed(2)} {units} Max: {props.max.toFixed(2)} {units}</p>
        }
        else {
            footerContent = <p></p>
        }

        return (
            <div className="card-body">
                <div className="card-body">
                    <h5 className="card-title">{props.sensorName}</h5>
                    <WrappedComponent {...props} units={units} />
                </div>
                {showFooter ?
                    <div className="card-footer">
                        {footerContent}
                    </div>
                    : null
                }
            </div>
        );
    };
}
