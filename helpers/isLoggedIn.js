import firebase from '../firebaseConfig';

const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
        })
    })

}
export default isLoggedIn;