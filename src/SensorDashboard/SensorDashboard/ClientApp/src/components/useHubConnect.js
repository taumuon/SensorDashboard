import { useState, useEffect } from "react";

import * as signalR from '@microsoft/signalr';

export default function useHubConnect(url) {
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        const rawHubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            //.withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Trace)
            .build();

        console.log("connecting to hub");

        rawHubConnection.start()
            .then(() => {
                setHubConnection(rawHubConnection);
                console.log('Connection Started!');
            })
            .catch(err => console.log('Error while estabilishing connection: ' + err));
    }, []);

    return hubConnection;
}