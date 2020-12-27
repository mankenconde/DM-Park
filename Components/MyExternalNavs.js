import React, { Component } from "react";
import { View } from "react-native";

import {
    NavigationApps,
    actions,
    googleMapsTravelModes,
    mapsTravelModes,
    wazeActions,
    googleMapsActions
} from "react-native-navigation-apps";

const PickUpNavigation = NavigationApps;
const DropOffNavigation = NavigationApps;

const MyExternalNavs = props => {
    // const currPickUpAddress = props.currPickUpAddress;
    // const currDropOffAddress = props.currDropOffAddress;
    const currPickUpCoords = props.currPickUpCoords;
    const currDropOffCoords = props.currDropOffCoords;

    // console.log("DRIVER DATA---", props.data);
    // console.log("props", props);
    // console.log(currPickUpCoords)
    console.log("coordinates", currDropOffCoords)

    return (
        <View style={{ display: "flex" }}>
            {/* {currPickUpCoords && currDropOffCoords ? ( */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                <DropOffNavigation
                    iconSize={50}
                    row
                    modalProps={{ animationType: "slide", transparent: true }}
                    modalContainerStyle={{
                        height: 200,
                        width: 200,
                        backgroundColor: "black",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    modalBtnCloseContainerStyle={{}}
                    modalBtnCloseStyle={{ borderWidth: 0 }}
                    modalBtnCloseTextStyle={{
                        fontSize: 10,
                        color: "white",
                        paddingTop: 20
                    }}
                    modalBtnOpenStyle={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    modalBtnOpenTextStyle={{
                        fontSize: 30,
                        // left: 10,
                        color: "black"
                    }}
                    viewMode="modal"
                    buttonIconName={"car-connected"}
                    modalBtnOpenTitle={"Go to parking"}
                    modalBtnCloseTitle={"Cancel"}
                    // actionSheetCloseTitle="OPEN"
                    // actionSheetCloseTitle="CLOSE"
                    // viewMode="sheet"
                    // address={"160 park hill ave, staten island, ny 10304"} // address to navigate by for all apps
                    waze={{
                        // address: "",
                        lat: currDropOffCoords.latitude,
                        lon: currDropOffCoords.longitude,
                        action: actions.searchLocationByLatAndLon
                    }} // specific settings for waze
                    //******************************************************* */
                    //**Google Maps DISABLED in NavigationApp.js for now. NOT WORKING properly. To enable, just uncomment the Google Maps part in the NavigationApp.js state */
                    googleMaps={{
                        // search: "17 jake court",
                        lat: currDropOffCoords.latitude,
                        lon: currDropOffCoords.longitude,
                        action: actions.searchLocationByLatAndLon,
                        travelMode: googleMapsTravelModes.driving
                    }} // specific settings for google maps
                    //***************************************************** */
                    maps={{
                        lat: currDropOffCoords.latitude,
                        lon: currDropOffCoords.longitude,
                        action: actions.searchLocationByLatAndLon,
                        travelMode: mapsTravelModes.driving
                    }} // specific settings for maps
                />
            </View>
            {/* ) : null} */}
        </View>
    );
};

export default MyExternalNavs;
