import { API_KEY } from "../keys/secrets";
import Polyline from "@mapbox/polyline";

const GetDirections = async (originCoords, destinationCoords) => {
    return new Promise(async (resolve, reject) => {
        try {
            let originLatitude = originCoords.latitude;
            let originLongitude = originCoords.longitude;
            let destinationLatitude = destinationCoords.latitude;
            let destinationLongitude = destinationCoords.longitude;
            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${API_KEY}`
            );
            let respJson = await resp.json();
            // console.log("response--", respJson);
            //console.log(Polyline.decode())
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            // this.setState({
            //   coords: coords,
            //   pickUpLatitude: respJson.routes[0].legs[0].start_location.lat,
            //   pickUpLongitude: respJson.routes[0].legs[0].start_location.lng,
            //   dropOffLatitude: respJson.routes[0].legs[0].end_location.lat,
            //   dropOffLongitude: respJson.routes[0].legs[0].end_location.lng
            // });
            resolve({ coords, respJson });
        } catch (error) {
            console.log("error getting directions", error)
            reject(error);
        }
    });
};

export default GetDirections;
