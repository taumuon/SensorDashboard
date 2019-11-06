import React, { useEffect, useReducer } from 'react';

// min-max higher order component
export default function withSensorMinMax(WrappedComponent) {
    return props => {

        const [max, calcMax] = useReducer((state, action) => state === undefined ? action : Math.max(state, action), undefined);
        const [min, calcMin] = useReducer((state, action) => state === undefined ? action : Math.min(state, action), undefined);

        useEffect(() => {
            if (props.latestMsg && props.latestMsg !== null) {
                calcMax(props.latestMsg.value);
                calcMin(props.latestMsg.value);
            }
        }, [props.latestMsg, min, max])

        return <WrappedComponent min={min} max={max} {...props} />;
    };
};
