//Loading.js
import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from "react-native";

import firebase from "../firebaseConfig";

// import { connect } from "react-redux";
// import { updateUserInfo } from "../redux/actions/userActions";

class Loading extends Component {
    componentDidMount = async () => {
        const isDriver = await AsyncStorage.getItem("isDriver");
        const status = await AsyncStorage.getItem("isLoggedIn");

        firebase.auth().onAuthStateChanged(async user => {
            try {
                if (user && status) {
                    const userInfo = {
                        id: user.uid,
                        isDriver: isDriver
                    };
                    alert("loggedIn")
                    //   this.props.dispatch(updateUserInfo(userInfo));
                } else this.props.navigation.navigate("LoginRoute");
            } catch (error) {
                console.log("error loading--", error);
                this.props.navigation.navigate("LoginRoute");
            }
        });
    };



    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Loading;
