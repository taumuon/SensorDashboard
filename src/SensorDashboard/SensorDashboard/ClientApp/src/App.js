import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Configuration } from './components/Configuration';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { sensorConfig: [], sensorConfigMap: {}, loadingConfig: true };

        fetch('api/Configuration/Sensors')
            .then(response => response.json())
            .then(data => {
                let cfgLookup = {};
                for (let sensor of data) {
                    cfgLookup[sensor.name] = sensor;
                }
                this.setState({
                    sensorConfig: data,
                    sensorConfigMap: cfgLookup,
                    loadingConfig: false
                });
            });
    }

    render() {
        return (
            <Layout>
                <Route exact path='/'
                       render={(props) => <Dashboard {...props} sensorConfigMap={this.state.sensorConfigMap}/>}/>
                <Route path='/configuration'
                       render={(props) => <Configuration {...props} sensorConfig={this.state.sensorConfig} sensorConfigMap={this.state.sensorConfigMap} loadingConfig={this.state.loadingConfig} />} />
            </Layout>
        );
    }
}
