import firebase from '../firebaseConfig';

const registerUser = async (firstName, lastName, email, phoneNumber, password) => {
    try {
        let db = firebase.firestore();

        let result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log("user created. user:", result);
        let user = result.user;
        let userId = result.user.uid;
        await db.collection("users").doc(userId).set({
            firstName,
            lastName,
            email,
            phoneNumber,
            id: userId
        })
        console.log("user saved to database:", {
            firstName,
            lastName,
            email,
            phoneNumber,
            userId
        })
        return { user };
    } catch (error) {
        console.log("error registering user", error);

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error registering user", error);
        console.log("error code", errorCode);
        console.log("error message", errorMessage);
        return { error, errorCode, errorMessage }
    }
}
export default registerUser