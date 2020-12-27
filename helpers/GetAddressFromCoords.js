import { API_KEY } from "../keys/secrets";
const GetAddressFromCoords = async (latitude, longitude) => {
    return new Promise(async (resolve, reject) => {
        try {

            let resp = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            let respJson = await resp.json();
            let address = respJson.results[0].formatted_address;


            resolve(address);
        } catch (error) {
            console.log("error getting directions", error)
            reject(error);
        }
    });
};

export default GetAddressFromCoords;
