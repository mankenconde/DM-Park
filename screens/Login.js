import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableWithoutFeedback,
    Keyboard,
    Button, StatusBar,
    Image
} from "react-native";
import { Container, Form, Input, Item, Label } from "native-base";
import isLoggedIn from '../helpers/isLoggedIn';
import loginUser from '../helpers/loginUser';
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }

    login = async () => {
        let { email, password } = this.state;
        let result = await loginUser(email, password);
        if (result.user) {
            this.props.navigation.navigate("Home");
        } else {
            alert(`Error: ${result.errorMessage}`)
        }
    }

    goToRegister = () => {
        this.props.navigation.navigate("Register");
    }

    async componentDidMount() {
        try {


            let user = await isLoggedIn();
            if (user) {
                alert("You're already logged In");
                this.props.navigation.navigate("Home")
            }
        } catch (error) {
            console.log("error in login mount", error)
        }
    }

    render() {
        return (
            <>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />
                <StatusBar barStyle="light-content" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={styles.container}>
                        <View
                            style={{
                                flex: 2,
                                alignSelf: "center",
                                paddingTop: 50,

                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 60,
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                }}
                            >
                                Welcome to
                </Text>
                            <Text
                                style={{ fontSize: 60, fontWeight: "bold", alignSelf: "center" }}
                            >
                                DMPark
                </Text>
                        </View>
                        <Form style={{ flex: 5 }}>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={email => this.setState({ email })}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={password => this.setState({ password })}
                                />
                            </Item>
                            <Button title="Login" onPress={() => this.login()} />
                            <Button title="Register" onPress={() => this.goToRegister()} />

                        </Form>
                    </Container>
                </TouchableWithoutFeedback>
            </>
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


export default Login;