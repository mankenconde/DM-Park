import firebase from '../firebaseConfig';

const loginUser = async (email, password) => {
    try {
        let user = await firebase.auth().signInWithEmailAndPassword(email, password);
        return { user };
    } catch (error) {
        console.log("error loging user in");
        var errorCode = error.code;
        var errorMessage = error.message;
        return { error, errorCode, errorMessage }
    }
}
export default loginUser;