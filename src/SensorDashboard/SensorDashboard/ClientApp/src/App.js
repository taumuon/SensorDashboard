import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Configuration } from './components/Configuration';

export default function App(props) {
    return (
        <Layout>
            <Route exact path='/'
                render={(props) => <Dashboard {...props} />} />
            <Route path='/configuration'
                render={(props) => <Configuration {...props} />} />
        </Layout>
    );
}
