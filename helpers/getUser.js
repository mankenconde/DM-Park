import firebase from '../firebaseConfig';

const getUser = async (id) => {
    try {
        const db = firebase.firestore();
        let userSnap = await db.collection("users").doc(id).get();
        let userInfo = userSnap.data();
        return { userInfo }
    } catch (error) {
        console.log("error getting user info", error);
        return { error }
    }

}
export default getUser;