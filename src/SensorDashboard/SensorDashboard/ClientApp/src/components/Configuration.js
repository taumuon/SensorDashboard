import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, FormText, Col, Label } from 'reactstrap';

export function Configuration(props) {
    return (
        <div>
            <h1>Sensor Configuration</h1>
            <ConfigurationItems {...props} />
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

class NewConfigurationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sensorName: '',
            manufacturer: '',
            host_device: '',
            units: '',
            errors: {
                sensorName: '',
                manufacturer: ''
            },
        };
    }

    handleInput = e => {
        const { name, value } = e.target;

        let errors = this.state.errors;

        switch (name) {
            case 'sensorName':
                errors.sensorName = value.length <= 0 ? 'Name not set' : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    submitForm(e) {
        e.preventDefault();
        console.log(`submit ${this.state.sensorName} ${this.state.manufacturer}`)
    }

    render() {
        return (
            <div>
                <h2>New Item</h2>
                <Form onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="sensorName"
                                value={this.state.sensorName}
                                valid={this.state.errors.sensorName === ''}
                                invalid={this.state.errors.sensorName !== ''}
                                onChange={e => this.handleInput(e)}
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
                                value={this.state.manufacturer}
                                onChange={e => this.handleInput(e)}
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
}
