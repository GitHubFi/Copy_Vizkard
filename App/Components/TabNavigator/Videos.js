import React, { Component } from 'react';
const { width, height, scale, fontScale } = Dimensions.get("window");
import { StyleSheet, View, WebView, Platform, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Icon } from "native-base";


export default class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {

      List: [
        "https://www.youtube.com/embed/e2ohD4DSmZE?autoplay=1",
        "https://www.youtube.com/embed/aT-51cfUm0A",
        "https://www.youtube.com/embed/S2Tcq_aOLM8",
        "https://www.youtube.com/embed/jHxMAptvetc",
        "https://www.youtube.com/embed/dnR4V6sz8N0"


      ]

    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Videos",
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {/* <Image
            source={require("../../../assets/Setting.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
          /> */}
          <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 12
      },
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/groupChat.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };
  render() {
    return (
      <ScrollView>


        <View style={{ flex: 1 }}>
          {
            this.state.List.map((value, key) => {
              return <View key={key} style={{ height: 300 }}>
                <WebView
                  key={key}
                  style={styles.WebViewContainer}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: value }}
                // allowsInlineMediaPlayback={true}
                // mediaPlaybackRequiresUserAction={false}

                />
              </View>
            })
          }


        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({

  WebViewContainer: {

    marginTop: (Platform.OS == 'ios') ? 20 : 0,

  }

});