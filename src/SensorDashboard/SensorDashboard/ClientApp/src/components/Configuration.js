import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, FormText, Col, Label } from 'reactstrap';
import useHubConnect from './useHubConnect.js';

export function Configuration(props) {
    const hubConnection = useHubConnect('/configurationHub');

    let [conf, setConf] = useState({
        sensorConfig: null,
        sensorConfigMap: null,
        loadingConfig: true
    });

    useEffect(() => {
        if (hubConnection) {
            hubConnection.invoke("sensors")
                .then(data => {
                    let cfgLookup = {};
                    for (let sensor of data) {
                        cfgLookup[sensor.name] = sensor;
                    }
                    setConf({
                        sensorConfig: data,
                        sensorConfigMap: cfgLookup,
                        loadingConfig: false
                    });
                });
        }
    }, [hubConnection]);

    return (
        <div>
            <h1>Sensor Configuration</h1>
            <ConfigurationItems {...props} sensorConfigMap={conf.sensorConfigMap} sensorConfig={conf.sensorConfig} loadingConfig={conf.loadingConfig}/>
            <NewConfigurationItem {...props} />
        </div>
    );
}

function ConfigurationItems(props) {
    return ( props.loadingConfig
        ? <p><em>Loading...</em></p>
        : <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Host Device</th>
                    <th>Units</th>
                </tr>
            </thead>
            <tbody>
                {props.sensorConfig.map(sensor =>
                    <tr key={sensor.name}>
                        <td>{sensor.name}</td>
                        <td>{sensor.manufacturer}</td>
                        <td>{sensor.hostDevice}</td>
                        <td>{sensor.sensorUnits}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export function NewConfigurationItem(props) {
    const [sensorName, setSensorName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [errors, setErrors] = useState( {
        sensorName: '',
        manufacturer: ''
    });

    const submitForm = (e) => {
        e.preventDefault();
        console.log(`submit ${sensorName} ${manufacturer}`)
    }

    const handleInput = e => {
        const { name, value } = e.target;

        switch (name) {
            case 'sensorName':
                errors.sensorName = value.length <= 0 ? 'Name not set' : '';
                setSensorName(value);
                break;

            case 'manufacturer':
                setManufacturer(value);
                break;
            default:
                break;
        }

        setErrors(errors);
        console.log(errors);
    }

    return (
        <div>
            <h2>New Item</h2>
            <Form onSubmit={(e) => submitForm(e)}>
                <Col>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="sensorName"
                            value={sensorName}
                            valid={errors.sensorName === ''}
                            invalid={errors.sensorName !== ''}
                            onChange={e => handleInput(e)}
                            placeholder="Name" />
                        <FormFeedback valid>
                            Name is valid
                            </FormFeedback>
                        <FormFeedback>
                            Name is not valid
                            </FormFeedback>
                        <FormText>>Enter a unique sensor name.</FormText>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Manufacturer</Label>
                        <Input
                            type="text"
                            name="manufacturer"
                            value={manufacturer}
                            onChange={e => handleInput(e)}
                            placeholder="Manufacturer" />
                    </FormGroup>
                </Col>
                <Button type="submit" name="submit" value="submit">
                    add
                    </Button>
            </Form>
        </div>
    );
}
