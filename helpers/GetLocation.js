import * as Permissions from "expo-permissions";

const GetLocation = new Promise(async (resolve, reject) => {
    try {
        const { status } = await Permissions.getAsync(Permissions.LOCATION);

        if (status !== "granted") {
            const response = await Permissions.askAsync(Permissions.LOCATION);
        }

        return navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const location = {
                    latitude,
                    longitude
                };
                console.log("LOCATION", location.latitude, location.longitude);
                resolve(location);
            }
        );
    } catch (error) {
        console.log("error getting location", error);
        reject(error);
    }
});

export default GetLocation;