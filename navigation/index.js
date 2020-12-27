import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
    createBottomTabNavigator,
    createTabNavigator,
} from "react-navigation-tabs";

import Loading from "../Components/Loading";
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from "../screens/Profile";

const stackNav = createStackNavigator(
    {
        Register: Register,
    },
    {
        headerMode: "none",
    }
)

const bottomNav = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="home" style={{ color: "black" }} size={30} />;
                },
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="car" style={{ color: "black" }} size={30} />;
                },
            },
        },

        Login: {
            screen: Login,
            navigationOptions: {
                tabBarLabel: "Login",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="login" style={{ color: "black" }} size={30} />;
                },
            },
        },
    },
    {
        initialRouteName: "Home",
        tabBarOptions: {
            showIcon: true,
            // showLabel: false
        },
    }
);

const AppSwitchNavigator = createSwitchNavigator({
    stackNav: stackNav,
    bottomNav: bottomNav
})

let Navigation = createAppContainer(AppSwitchNavigator);


export default Navigation;
