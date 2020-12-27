import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    // SafeAreaView,
    Button,
    StatusBar,
} from "react-native";

import { Container } from "native-base";

import MaterialCard6 from "../Components/MaterialCard6";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import isLoggedIn from "../helpers/isLoggedIn";
import logoutUser from "../helpers/logoutUser";
import getUser from "../helpers/getUser";

class DriverInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loggedIn: false,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            image: null
        }
    }

    logout = async () => {
        try {


            await logoutUser();
            console.log("loged out")
            this.setState({ user: null, loggedIn: false });
            this.props.navigation.navigate("Login");
        } catch (error) {
            console.log("error loging out", error)
        }
    }

    async componentDidMount() {
        try {

            let user = await isLoggedIn();
            if (user) {
                let id = user.uid;
                let result = await getUser(id);
                let { firstName, lastName, email, phoneNumber } = result?.userInfo;
                this.setState({
                    user,
                    loggedIn: true,
                    firstName,
                    lastName, email, phoneNumber
                })
            } else {
                alert("Please login first");
                this.props.navigation.navigate("Login")
            }
        } catch (error) {
            console.log("error mounting profile", error)
        }
    }

    render() {
        return (
            <SafeAreaView>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <StatusBar barStyle="light-content" />

                <ScrollView>
                    <Container>
                        <MaterialCard6
                            style={styles.materialCard6}
                            Fname={this.state.firstName}
                            Lname={this.state.lastName}
                            email={this.state.email}
                            image={"../assets/DMPARK.png"}
                            phoneNumber={this.state.phoneNumber}
                        // uploadPic={() => this._pickImage()}
                        />

                        <Button full
                            rounded
                            primary title="Sign out" onPress={() => this.logout()} />

                    </Container>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: 'center',
        justifyContent: "center",
    },
});

export default DriverInfo;
