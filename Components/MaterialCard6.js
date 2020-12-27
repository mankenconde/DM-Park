import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class MaterialCard6 extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {/* <TouchableHighlight
          style={styles.cardItemImagePlace}
          onPress={this.props.uploadPic}
        >
          <ImageBackground
            source={{ uri: this.props.image }}
            style={styles.cardItemImagePlace}
          >
            <Icon
              onPress={this.props.uploadPic}
              name="camera"
              style={styles.iconCamera}
            />
          </ImageBackground>
        </TouchableHighlight> */}
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>
            {this.props.Fname}
            {"  "}
            {this.props.Lname}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold", color: "#349eeb" }}>
              Email
              </Text>{" "}
            {this.props.email}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold", color: "#349eeb" }}>
              Phone Number
              </Text>{" "}
            {this.props.phoneNumber}
          </Text>
        </View>
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    // minHeight: screenHeight,
    shadowColor: "#000",
    shadowOpacity: 0,
    shadowRadius: 2,
    overflow: "hidden"
  },
  cardItemImagePlace: {
    flex: 1,
    backgroundColor: "#ccc",
    minHeight: 30
    //minWidth: screenWidth-20,
  },
  bodyContent: {
    //justifyContent: "center",
    padding: 16,
    flex: 3
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24
  },
  subtitleStyle: {
    color: "#000",
    opacity: 1,
    fontSize: 14,
    lineHeight: 16
  },

  button: {
    height: 50,
    width: 80,
    position: "absolute",
    borderRadius: 10,
    left: screenWidth - 110
  },

  // iconInfo: {
  //   color: "black",
  //   fontSize: 40,
  //   left: screenWidth-50,
  //   position: 'absolute'
  // },

  iconCamera: {
    color: "black",
    fontSize: 40,
    left: screenWidth - 50,
    position: "absolute"
  }
});
