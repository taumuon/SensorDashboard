import { useState, useEffect, useDebugValue } from "react";

import * as signalR from '@microsoft/signalr';

export default function useHubConnect(url) {
    useDebugValue(url);

    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        const rawHubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            //.withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Trace)
            .build();

        console.log("connecting to hub url: " + url);

        rawHubConnection.start()
            .then(() => {
                setHubConnection(rawHubConnection);
                console.log('Connection Started! url: ' + url);
            })
            .catch(err => console.log('Error while establishing connection to url: ' + url + ' err: ' + err));

        // TODO: need rawHubCconnection.stop() ?
    }, [url]);

    return hubConnection;
}