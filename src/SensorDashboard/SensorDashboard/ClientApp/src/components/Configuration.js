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
            name: undefined,
            manufacturer: undefined,
            host_device: undefined,
            units: undefined,
            validate: {
                nameState: '',
            },
        };
    }

    handleNameInput = e => {
        let nameValue = e.Target.value;
        const { validate } = this.state
// if (!value.toString().trim().length)
        const valid = nameValue.trim() !== ''
        if (valid) {
            validate.nameState = 'name-success'
        } else {
            validate.nameState = 'name-failure'
        }
        this.setState(
            {
                name: nameValue,
                validate: {validate}
            });
    };

    handleManufacturerInput = e => {
        this.setState(
            {
                manufacturer: e.Target.Value
            });
    };

    submitForm(e) {
        e.preventDefault();
        console.log(`submit ${this.state.name} ${this.state.manufacturer}`)
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
                                value={this.state.name}
                                valid={this.state.validate.nameState === 'name-success'}
                                invalid={this.state.validate.nameState === 'name-failure'}
                                onChange={e => this.handleNameInput(e)}
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
                                value={this.state.manufacturer}
                                onChange={e => this.handleManufacturerInput(e)}
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
