import firebase from '../firebaseConfig';

const logoutUser = async () => {
    try {
        await firebase.auth().signOut();
        return true;
    } catch (error) {
        console.log("error loging out user", error);
        return false;
    }

}
export default logoutUser;