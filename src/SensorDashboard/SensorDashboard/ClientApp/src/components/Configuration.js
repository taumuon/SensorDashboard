import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, Col, Label } from 'reactstrap';
import useHubConnect from './useHubConnect.js';

export function Configuration(props) {
    const hubConnection = useHubConnect('/configurationHub');

    let [conf, setConf] = useState({
        sensorConfig: [],
        loadingConfig: true
    });

    useEffect(() => {
        if (hubConnection) {
            console.log('susbscribing config');

            hubConnection.on("ConfigUpdated", (item) => {
                console.log(item.sensorConfig);
                console.log('adding item: ' + item);
                setConf(config => {
                    return {
                        sensorConfig: config.sensorConfig.concat([item.sensorConfig]),
                        loadingConfig: config.loadingConfig
                    }
                });
                console.log('added item: ' + item + 'new items: ' + conf.sensorConfig);
            });

            hubConnection.invoke("sensors")
                .then(data => {
                    setConf(config => {
                        return {
                            sensorConfig: config.sensorConfig.concat(data),
                            loadingConfig: false
                        }
                    });
                });
        }
    }, [hubConnection, conf.sensorConfig]);

    const addSensor = (name, manufacturer, hostDevice, units) => {
        return hubConnection.invoke("addSensor", name, manufacturer, hostDevice, units);
    };

    return (
        <div>
            <h1>Sensor Configuration</h1>
            <ConfigurationItems {...props} sensorConfig={conf.sensorConfig} loadingConfig={conf.loadingConfig}/>
            <NewConfigurationItem {...props} sensorConfig={conf.sensorConfig} addSensor={addSensor}/>
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

const initErrors = {
    sensorName: 'Name not set',
    manufacturer: 'Manufacturer not set',
    hostDevice: 'Host Device not set',
    units: 'Units not set',
};

export function NewConfigurationItem(props) {
    const [sensorName, setSensorName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [hostDevice, setHostDevice] = useState('');
    const [units, setUnits] = useState('');
    const [errors, setErrors] = useState( initErrors );

    const submitForm = (e) => {
        e.preventDefault();
        const result = props.addSensor(sensorName, manufacturer, hostDevice, units);
        result.then(r => {
            if (r !== '') {
                alert(`unable to add sensor: ` + r)
            }
            else {
                setSensorName('');
                setManufacturer('');
                setHostDevice('');
                setUnits('');
                setErrors(initErrors);
            }
        });
    }

    const handleInput = e => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        switch (name) {
            case 'sensorName':
                if (value.length === 0) {
                    newErrors.sensorName = 'Name not set';
                }
                else if (props.sensorConfig.map(sensor => sensor.name).includes(value)) {
                    newErrors.sensorName = 'Name already exists';
                }
                else {
                    newErrors.sensorName = '';
                }
                setSensorName(value);
                break;
            case 'manufacturer':
                newErrors.manufacturer = value.length === 0 ? 'Manufacturer not set' : '';
                setManufacturer(value);
                break;
            case 'hostDevice':
                newErrors.hostDevice = value.length === 0 ? 'HostDevice not set' : '';
                setHostDevice(value);
                break;
            case 'units':
                newErrors.units = value.length === 0 ? 'Units not set' : '';
                setUnits(value);
                break;
            default:
                break;
        }

        setErrors(newErrors);
    }

    return (
        <div>
            <h2>New Sensor</h2>
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
                            {errors.sensorName}
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Manufacturer</Label>
                        <Input
                            type="text"
                            name="manufacturer"
                            valid={errors.manufacturer === ''}
                            invalid={errors.manufacturer !== ''}
                            value={manufacturer}
                            onChange={e => handleInput(e)}
                            placeholder="Manufacturer" />
                        <FormFeedback>
                            {errors.manufacturer}
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Host Device</Label>
                        <Input
                            type="text"
                            name="hostDevice"
                            valid={errors.hostDevice === ''}
                            invalid={errors.hostDevice !== ''}
                            value={hostDevice}
                            onChange={e => handleInput(e)}
                            placeholder="Host Device" />
                        <FormFeedback>
                            {errors.hostDevice}
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Units</Label>
                        <Input
                            type="text"
                            name="units"
                            valid={errors.units === ''}
                            invalid={errors.units !== ''}
                            value={units}
                            onChange={e => handleInput(e)}
                            placeholder="Units" />
                        <FormFeedback>
                            {errors.units}
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Button type="submit" name="submit" value="submit" disabled={Object.keys(errors).some(x => errors[x] !== '')}>
                    add
                </Button>
            </Form>
        </div>
    );
}
