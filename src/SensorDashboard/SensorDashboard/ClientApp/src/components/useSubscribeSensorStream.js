import { useState, useEffect, useDebugValue } from "react";

export default function useSubscribeSensorStream(hubConnection, streamName, sensorName) {
    useDebugValue(streamName);

    const [data, setData] = useState({ latestMsg: null });

    useEffect(() => {
        console.log('useSubscribeSensorStream ' + hubConnection + ' ' + streamName + ' ' + sensorName);
        if (hubConnection !== undefined && hubConnection !== null) {
            console.log('susbscribing ' + streamName + ' ' + sensorName);
            const streamSubscription = hubConnection.stream(streamName, sensorName)
                .subscribe({
                    next: (item) => {
                        setData({ latestMsg: item });
                    },
                    complete: () => {
                        console.log('completed');
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });

            return () => { streamSubscription.dispose(); };
        }
    }, [hubConnection, streamName, sensorName]);

    return data;
}