import React, { Component } from 'react';
import { Button } from 'react-native';
import openMap from 'react-native-open-maps';

export default class App extends Component {
    _goToYosemite = () => {
        openMap({ latitude: parseFloat(this.props.destinationCoords.latitude), longitude: parseFloat(this.props.destinationCoords.longitude), travelType: "drive", provider: "google", navigate_mode: "navigate", end: this.props.destinationAddress });
    }

    render() {
        console.log("props", this.props)
        return (
            <Button
                color={'black'}
                onPress={this._goToYosemite}
                title="Click To Open Maps 🗺" />
        );
    }
}
