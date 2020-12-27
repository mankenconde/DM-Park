import React from 'react';
import { Button } from 'react-native';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import GetLocation from '../helpers/GetLocation';
import MyExternalNavs from '../Components/MyExternalNavs';
import GetDirections from '../helpers/GetDirections'
import OpenMaps from '../Components/OpenMaps'
import GetAddressFromCoords from '../helpers/GetAddressFromCoords';
import firebase from '../firebaseConfig';
import isLoggedIn from '../helpers/isLoggedIn';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
class Home extends React.Component {

    state = {
        loggedIn: true,
        latitude: null,
        longitude: null,
        availableParking: [],
        selectedSpot: {},
        currDropOffCoords: {},
        destinationAddress: null,
        parkingSpots: [],
        showSetParkingButton: false
    }

    getCurrentLocation = async () => {
        const location = await GetLocation;
        this.setState({
            latitude: location.latitude,
            longitude: location.longitude
        });

    };

    goToParkingSpot = (spot) => {
        this.viewOnMap(spot)
        let { latitude, longitude } = spot;

        this.setState({
            selectedSpot: spot,
            currDropOffCoords: { latitude, longitude },
            showSetParkingButton: false
        })
        console.log("spot", spot)
    }

    viewOnMap = async (
        spot
    ) => {
        let { latitude, longitude } = this.state;
        const destinationCoords = spot;
        const departureCoords = { latitude, longitude }
        // this.setState({
        //   currPickUpCoords: departureCoords,
        //   currDropOffCoords: destinationCoords,
        //   // currPickUpAddress: tripDeparture,
        //   // currDropOffAddress: tripDestination
        // });
        let address = await GetAddressFromCoords(destinationCoords.latitude, destinationCoords.longitude);
        this.setState({
            destinationAddress: address
        })
        this.getDirections(departureCoords, destinationCoords);
    };

    getDirections = async (departureCoords, destinationCoords) => {
        const result = await GetDirections(departureCoords, destinationCoords);
        const coords = result.coords;
        const respJson = result.respJson;
        console.log("resp json", respJson)
        this.setState({
            coords: coords,
            pickUpLatitude: respJson.routes[0].legs[0].start_location.lat,
            pickUpLongitude: respJson.routes[0].legs[0].start_location.lng,
            dropOffLatitude: respJson.routes[0].legs[0].end_location.lat,
            dropOffLongitude: respJson.routes[0].legs[0].end_location.lng
        });
    };

    getParkingSpots = async () => {
        try {

            const db = firebase.firestore();
            let result = await db.collection("parkingSpots").get();
            let parkingSpots = [];
            result.docs.map(doc => {
                parkingSpots.push(doc.data().spot)
            });

            this.setState({ parkingSpots })
        } catch (error) {
            console.log("error getting parking spots", error);
        }
    }

    setParkingSpots = async (spot) => {
        try {
            let { latitude, longitude } = spot;
            let parkingSpots = this.state.parkingSpots;
            const db = firebase.firestore();
            await db.collection("parkingSpots").add({
                spot: new firebase.firestore.GeoPoint(latitude, longitude)
            });
            parkingSpots.push(spot);

            this.setState({ parkingSpots })
        } catch (error) {
            console.log("error setting parking spots", error);
        }
    }

    showSetParking = (val) => {
        this.setState({
            showSetParkingButton: val
        })
    }

    goToLogin = () => {
        this.props.navigation.navigate("Login");
    }

    async componentDidMount() {
        try {
            this.getCurrentLocation();
            let user = await isLoggedIn();
            console.log("user", user)
            if (user) {
                this.setState({ loggedIn: true })
                await this.getParkingSpots();
            } else {
                this.setState({ loggedIn: false })

            }
        } catch (error) {
            console.log("error loading", error);
        }
    }

    render() {
        const latitude = this.state.latitude;
        const longitude = this.state.longitude;
        return (
            <>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <StatusBar barStyle="light-content" />
                {
                    this.state.latitude && this.state.longitude ? <View style={styles.container}>
                        {this.state.currDropOffCoords.latitude && this.state.currDropOffCoords.longitude && this.state.showSetParkingButton === false ?
                            <View style={{ marginTop: 100, alignSelf: "center", padding: 20 }}>
                                <OpenMaps
                                    destinationAddress={this.state.destinationAddress}
                                    destinationCoords={this.state.currDropOffCoords}
                                /></View> : null}
                        {this.state.showSetParkingButton === true ? <View style={{ marginTop: 100, alignSelf: "center", padding: 20 }}><Button title="Set Parking Spot" color={'black'} onPress={() => this.setParkingSpots({ latitude, longitude })} /></View> : null}
                        {/* <MyExternalNavs
            // currPickUpAddress={currPickUpAddress}
            // currDropOffAddress={currDropOffAddress}
            currPickUpCoords={{ latitude, longitude }}
            currDropOffCoords={this.state.currDropOffCoords}
          /> */}
                        {this.state.loggedIn === false ?
                            <View style={{ marginTop: 100, alignSelf: "center", backgroundColor: "black", padding: 20, borderWidth: 3, borderStyle: "solid", borderColor: "white", borderRadius: 5 }}>
                                <Text onPress={() => this.goToLogin()} style={{ color: "white", alignSelf: "center", paddingTop: 20, fontWeight: "bold" }}> Please login to get available parkings near you. Login</Text>
                            </View> : null}
                        <MapView style={styles.mapStyle}
                            // showsUserLocation
                            initialRegion={{
                                latitude,
                                longitude,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1
                            }}
                        >


                            <MapView.Polyline
                                coordinates={this.state.coords}
                                strokeWidth={2}
                                strokeColor="blue"
                            />
                            <MapView.Marker
                                onPress={() => this.showSetParking(true)}
                                title="Show Available Parking"
                                pinColor="red"
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude
                                }}
                            />

                            {this.state.parkingSpots.map((spot, i) => (
                                <MapView.Marker
                                    key={i}
                                    onPress={() => this.goToParkingSpot(spot)}
                                    title="Go to parking"
                                    // pinColor="blue"
                                    coordinate={{
                                        latitude: spot.latitude,
                                        longitude: spot.longitude
                                    }}
                                    image="https://firebasestorage.googleapis.com/v0/b/dmpark-9b061.appspot.com/o/icon.png?alt=media&token=df099d9b-80bf-4a22-86b1-58162c1616da"
                                />
                            ))}



                        </MapView>
                    </View>
                        : <View style={styles.container}>
                            <Text>Loading... Make sure that you give permission to get location</Text><ActivityIndicator size="large" />
                        </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // marginTop: 100
    },
});

export default Home;