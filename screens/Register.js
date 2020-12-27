import React from 'react';
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
    View,
    // SafeAreaView,
    AsyncStorage,
    TouchableWithoutFeedback,
    Keyboard,
    Button
} from "react-native";
import {
    Container,
    Content,
    Header,
    Form,
    Input,
    Item,
    Label,
} from "native-base";
import SafeAreaView from "react-native-safe-area-view";
import isLoggedIn from '../helpers/isLoggedIn';
import registerUser from '../helpers/registerUser';

class Register extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confPassword: ""
    }

    signUpUser = async () => {
        try {
            let { firstName, lastName, email, phoneNumber, password, confPassword } = this.state;
            if (password !== confPassword) {
                return alert("Passwords do not match. Please try again.")
            }
            if (firstName, lastName, email, phoneNumber, password, confPassword) {
                let result = await registerUser(firstName, lastName, email, phoneNumber, password);
                console.log("user", result.user);
                if (result.user) {
                    this.props.navigation.navigate("Home")
                } else {
                    return alert(`Error: ${result.errorMessage}`)
                }
            } else {
                return alert("Please enter all necessary information");
            }
        } catch (error) {
            alert("Error registering, please try again");
            console.log("error signing up user", error);
        }
    }

    goToLogin = () => {
        this.props.navigation.navigate("Login")
    }

    async componentDidMount() {
        let user = await isLoggedIn();
        if (user) {
            alert("You're already logged in");
            this.props.navigation.navigate("Profile");
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView>
                    <SafeAreaView>
                        {/* <Container style={styles.container}> */}
                        <Form style={styles.form}>
                            <Item floatingLabel>
                                <Label>First Name</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(firstName) => this.setState({ firstName })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Last Name</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Phone Number</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Confirm Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(confPassword) =>
                                        this.setState({ confPassword })
                                    }
                                />
                            </Item>

                            <Button
                                style={styles.button}
                                title="Sign Up"
                                onPress={() => {
                                    this.signUpUser();
                                }}
                            />
                            <Button
                                style={styles.button}
                                title="Login"
                                onPress={() => {
                                    this.goToLogin();
                                }}
                            />
                        </Form>
                        {/* </Container> */}
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        padding: 10
    },

    switch: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30
    },

    textSwitch: {
        marginTop: 10,
        marginBottom: 10
    }
});
export default Register;