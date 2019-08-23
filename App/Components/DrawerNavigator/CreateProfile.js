import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from 'react-native-firebase'
import Users from '../SignIn/User'
import { Container, Header, Content, Item, Input, Icon, Spinner } from "native-base";
const { width, height } = Dimensions.get("window");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
// import AppAction from "../../Store/Actions/AppAction";
import { createProfileAction } from "../../Store/Actions/AppAction"
import { connect } from "react-redux";
class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      occupation: "",
      company: "",
      website: "",
      address: "",
      city: "",
      country: "",
      otherSpecify: '',
      SendInt: false,
      Send: false,
      Send1: false,
      Send2: false,
      Send3: false,
      Send4: false,
      Send5: false,
      Send6: false,
      Send7: false,
      Send8: false,
      Send9: false,
      Send10: false,
      Send11: false,
      Send12: false,
      Send13: false,
      Send14: false,
      Send15: false,
      Send16: false,
      Send17: false,
      Send18: false,
      Send19: false









    };
  }
  // static navigationOptions = {
  //   drawerIcon: ({ tintColor }) => (
  //     <MaterialCommunityIcons name="pencil" size={25} style={{ color: '#0071ce' }} />
  //   )
  // }

  static navigationOptions = ({ navigation }) => ({
    title: "Make Your Profile",
    headerStyle: {
      backgroundColor: "#008ace"
    },
    headerTintColor: "#fff",
    // headerLeft: (
    //   <TouchableOpacity onPress={navigation.getParam("openDrawer")}>
    //     <Image
    //       source={require("../../../assets/Setting.png")}
    //       resizeMode="contain"
    //       style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
    //     />
    //   </TouchableOpacity>
    // ),
    headerRight: (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={navigation.getParam("saveProfile")}
          style={{ flex: 0.4 }}
        >
          <Image
            source={require("../../../assets/Save.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginRight: 8 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 0.4 }}>
          <Image
            source={require("../../../assets/Back.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    )
  });
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      saveProfile: this.saveProfile
    });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        // console.log(user, "user available")
        // console.log(user._auth._user._user.uid, "uid")
        await AsyncStorage.setItem('User', user._auth._user._user.uid)


      } else {
        // ...
        // console.log('errorss')
      }
    });
    // const userToken = await AsyncStorage.getItem("User");
    // this.props.profileData(userToken)
    // this.props.userDetail.name ? console.log('user.................') : this.props.navigation.navigate('CreateProfile')
  }

  sendIntterest = (interest) => {

    const uid = this.props.userRegister_Uid
    firebase
      .database()
      .ref("users")
      .child(uid)
      .child("Interests")
      .child(interest)
      .set(interest).then(() => {
        if (interest === "Travel") {
          this.setState({

            Send1: true
          });
        } else if (interest === 'Advanture') {

          this.setState({
            Send: true,

          });
        } else if (interest === 'Sports') {
          this.setState({
            Send2: true
          })
        } else if (interest === "Shoes") {
          this.setState({
            Send3: true
          })
        } else if (interest === "Real State") {
          this.setState({
            Send4: true
          })
        } else if (interest === "Make-up") {
          this.setState({
            Send5: true
          })
        } else if (interest === "Jewellery") {
          this.setState({
            Send6: true
          })
        } else if (interest === "Home Appliances") {
          this.setState({
            Send7: true
          })
        } else if (interest === "Gifts") {
          this.setState({
            Send8: true
          })
        } else if (interest === "Gadgets") {
          this.setState({
            Send9: true
          })
        } else if (interest === "Furniture") {
          this.setState({
            Send10: true
          })
        } else if (interest === "Food") {
          this.setState({
            Send11: true
          })
        } else if (interest === "Electronics") {
          this.setState({
            Send12: true
          })
        } else if (interest === "Education") {
          this.setState({
            Send13: true
          })
        } else if (interest === "Books") {
          this.setState({
            Send14: true
          })
        } else if (interest === "Banking") {
          this.setState({
            Send15: true
          })
        } else if (interest === "Automobiles") {
          this.setState({
            Send16: true
          })
        } else if (interest === "Apparel") {
          this.setState({
            Send17: true
          })
        } else if (interest === "Animals") {
          this.setState({
            Send18: true
          })
        } else if (interest === "advanture") {
          this.setState({
            Send19: true
          })
        }



        setTimeout(() => {

          Alert.alert('', "your interest has been successfully submitted");
          this.setState({
            Send: false,
            Send1: false,
            Send2: false,
            Send3: false,
            Send4: false,
            Send5: false,
            Send6: false,
            Send7: false,
            Send8: false,
            Send9: false,
            Send10: false,
            Send11: false,
            Send12: false,
            Send13: false,
            Send14: false,
            Send15: false,
            Send16: false,
            Send17: false,
            Send18: false,
            Send19: false

          })
        }, 1000);

      }).catch((err) => {
        Alert.alert("", err);
      });


  }

  send_interest_Database = (value) => {
    const uid = this.props.userRegister_Uid

    firebase
      .database()
      .ref("users")
      .child(uid)
      .child("Interests")
      .child(`${value}`)
      .set(value).then(() => {
        this.setState({
          SendInt: true,
          otherSpecify: ''
        });

        setTimeout(() => {

          Alert.alert('', "your interest has been successfully submitted");
          this.setState({
            SendInt: false,

          })
        }, 2000);

      }).catch((err) => {
        Alert.alert("", err);
      });
  }


  saveProfile = () => {
    let {
      name,
      email,
      city,
      company,
      occupation,
      website,
      address,
      country
    } = this.state;
    // console.log(this.state)
    if (name == "") {
      ToastAndroid.show("please fill the name correctly", ToastAndroid.SHORT);
      return;
    } else if (city == "") {
      ToastAndroid.show("please fill the city name correctly", ToastAndroid.SHORT);
      return;

    } else if (address == "") {
      ToastAndroid.show("please fill the address correctly", ToastAndroid.SHORT);
      return;

    } else if (country == "") {
      ToastAndroid.show("please fill the country name correctly", ToastAndroid.SHORT);
      return;


    } else if (occupation == "") {
      ToastAndroid.show("please enter your  occupation correctly", ToastAndroid.SHORT);

    } else if (website == "") {
      ToastAndroid.show("please fill the website address correctly", ToastAndroid.SHORT);

    }
    this.props.createProfile({
      name,
      email,
      city,
      company,
      occupation,
      website,
      address,
      country,
      uid: this.props.userRegister_Uid,
      phoneNumber: this.props.phoneNumber,
      history: this.props.navigation
    });

  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2, backgroundColor: "#fff" }}>
          <Image
            source={require("../../../assets/header.png")}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 0.8, backgroundColor: "#fff" }}>
          <ScrollView
            contentContainerStyle={{}}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                width: width / 1.5,
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: '#dfe35r'
              }}
            >
              {/* <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1,

                }}
              >
               
                <Text
                  style={{
                    color: "#000",
                    width: width / 1.5,
                    fontSize: width / 18,
                    // marginLeft: 10,
                    // marginBottom: 8,
                    justifyContent: "center",
                    textAlign: "center",
                    fontStyle: "italic"
                    

                  }}>
                  If you have a profile go to Home.
               </Text>
              </View> */}
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1,

                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Name"}
                  placeholder="Name"
                  style={{ color: "#272727", }}
                  // keyboardType={"email-address"}
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"E-mail"}
                  placeholder="E-mail"
                  autoCapitalize={"none"}
                  style={{ color: "#272727", }}
                  keyboardType={"email-address"}
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Occupation"}
                  placeholder="Occupation"
                  style={{ color: "#272727", }}
                  // keyboardType={"email-address"}
                  onChangeText={occupation => this.setState({ occupation })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Company"}
                  placeholder="Company"
                  style={{ color: "#272727", }}
                  // autoCapitalize={"none"}
                  // keyboardType={"email-address"}
                  onChangeText={company => this.setState({ company })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Website"}
                  placeholder="Website"
                  style={{ color: "#272727", }}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}
                  onChangeText={website => this.setState({ website })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Address"}
                  placeholder="Address"
                  style={{ color: "#272727", }}
                  autoCapitalize={"none"}
                  // keyboardType={"email-address"}
                  onChangeText={address => this.setState({ address })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"City"}
                  placeholder="City"
                  style={{ color: "#272727", }}
                  autoCapitalize={"none"}
                  // keyboardType={"email-address"}
                  onChangeText={city => this.setState({ city })}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#272727",
                  borderBottomWidth: 1,
                  marginBottom: 15
                }}
              >
                {/* <MaterialCommunityIcons name="email" size={25} color="#272727" /> */}
                <Input
                  placeholderTextColor={"#272727"}
                  placeholder={"Country"}
                  placeholder="Country"
                  style={{ color: "#272727", }}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}
                  onChangeText={country => this.setState({ country })}
                />
              </View>
            </View>
            <View style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text
                style={{
                  color: "#008ace",
                  width: width / 1.5,
                  fontSize: width / 18,
                  marginLeft: 10,
                  marginBottom: 8,
                  justifyContent: "flex-start",
                  textAlign: "left"
                  // alignContent:'center',
                  // justifyContent:'center',
                  // alignItems:'center'

                }}

              >
                Say Hi, to What You Like To Get The Best Deals
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  {
                    (this.state.Send19 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("advanture")}
                      >

                        <Image

                          source={require("../../../assets/Adventure.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 7.5,
                            marginRight: 8,
                            marginLeft: -6,
                            //   backgroundColor: "orange",
                            height: height / 9
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send18 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Animals")}
                      >

                        <Image
                          source={require("../../../assets/Animals.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 10,
                            marginRight: 8,
                            height: height / 12
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send17 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Apparel")}
                      >

                        <Image
                          source={require("../../../assets/Apparel.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 10,
                            marginRight: 8,
                            height: height / 12
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send16 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Automobiles")}
                      >

                        <Image
                          source={require("../../../assets/Automobiles.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 7,
                            marginRight: 10,
                            marginLeft: -8,
                            height: height / 9
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send15 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Banking")}
                      >

                        <Image
                          source={require("../../../assets/Banking.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 10,
                            marginRight: 8,
                            height: height / 12
                          }}
                        />
                      </TouchableOpacity>
                  }

                </View>
                <View style={{ flexDirection: "column", }}>
                  {
                    (this.state.Send14 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Books")}
                      >

                        <Image
                          source={require("../../../assets/Books.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 12,
                            marginRight: 0,
                            marginLeft: 5,
                            height: height / 13,
                            // paddingTop: 10,
                            marginTop: 16
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send13 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Education")}
                      >

                        <Image
                          source={require("../../../assets/Education.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 8,
                            marginRight: 8,
                            height: height / 10,
                            paddingTop: 15

                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send12 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Electronics")}
                      >

                        <Image
                          source={require("../../../assets/Electronics.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 8,
                            marginRight: 7,
                            height: height / 9,
                            marginTop: -15


                          }}
                        />
                      </TouchableOpacity>
                  }
                  {
                    (this.state.Send11 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Food")}
                      >

                        <Image
                          source={require("../../../assets/Food.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 12,
                            marginRight: 5,
                            marginLeft: 8,
                            height: height / 14,
                            marginBottom: 18
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send10 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Furniture")}
                      >

                        <Image
                          source={require("../../../assets/Furniture.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 9,
                            marginRight: 8,
                            height: height / 11,
                            // paddingTop: 10,

                          }}
                        />
                      </TouchableOpacity>
                  }

                </View>
                <View style={{ flexDirection: "column" }}>
                  {
                    (this.state.Send9 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Gadgets")}
                      >

                        <Image
                          source={require("../../../assets/Gadgets.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 10,
                            marginRight: 8,
                            height: height / 11,
                            marginTop: 25,

                          }}
                        />
                      </TouchableOpacity>
                  }
                  {
                    (this.state.Send8 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Gifts")}
                      >

                        <Image
                          source={require("../../../assets/Gifts.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 13,
                            marginRight: 10,
                            height: height / 13,
                            marginLeft: 5
                          }}
                        />
                      </TouchableOpacity>
                  }
                  {
                    (this.state.Send7 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Home Appliances")}
                      >
                        <Image
                          source={require("../../../assets/HomeAppliances.png")}
                          resizeMode="contain"

                          style={{
                            width: width / 8,
                            marginRight: 8,
                            height: height / 9,
                            marginBottom: -18

                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send6 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      :

                      <TouchableOpacity
                        onPress={() => this.sendIntterest("Jewellery")}
                      >

                        <Image
                          source={require("../../../assets/Jewellery.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 8,
                            marginRight: 8,
                            height: height / 8,

                          }}
                        />
                      </TouchableOpacity>
                  }
                  {
                    (this.state.Send5 === true) ?
                      <View style={{
                        width: width / 9,
                        marginRight: 8,
                        height: height / 25,
                        marginTop: 20

                      }}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Make-up")}
                      >

                        <Image
                          source={require("../../../assets/Make-up.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 9,
                            marginRight: 8,
                            height: height / 8,
                            paddingTop: -25,
                            marginTop: -18
                          }}
                        />
                      </TouchableOpacity>
                  }
                </View>
                <View style={{ flexDirection: "column" }}>
                  {
                    (this.state.Send4 === true) ?
                      <View >

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Real State")}
                      >

                        <Image
                          source={require("../../../assets/RealEstate.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 8,
                            marginRight: 9,
                            height: height / 10,
                            marginTop: 10
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send3 === true) ?
                      <View style={[styles.container, styles.horizontal]}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Shoes")}
                      >

                        <Image
                          source={require("../../../assets/Shoes.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 13,
                            marginRight: 8,
                            height: height / 15,
                            marginBottom: 14,
                            marginTop: 10,
                            paddingTop: 10

                          }}
                        />
                      </TouchableOpacity>

                  }

                  {
                    (this.state.Send2 === true) ?
                      <View style={[styles.container, styles.horizontal]}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Sports")}
                      >

                        <Image
                          source={require("../../../assets/Sports.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 12,
                            marginRight: 8,
                            height: height / 14,
                            marginBottom: 14
                          }}
                        />
                      </TouchableOpacity>

                  }

                  {
                    (this.state.Send1 === true) ?
                      <View style={[styles.container, styles.horizontal]}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Travel")}
                      >

                        <Image
                          source={require("../../../assets/Travel.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 12,
                            marginRight: 8,
                            height: height / 14,
                            marginBottom: 14
                          }}
                        />
                      </TouchableOpacity>
                  }

                  {
                    (this.state.Send === true) ?
                      <View style={[styles.container, styles.horizontal]}>

                        <ActivityIndicator size="small" color="#000000" />

                      </View>
                      : <TouchableOpacity
                        onPress={() => this.sendIntterest("Advanture")}
                      >

                        <Image
                          source={require("../../../assets/Adventure.png")}
                          resizeMode="contain"
                          style={{
                            width: width / 8,
                            marginRight: 8,
                            height: height / 10
                          }}
                        />
                      </TouchableOpacity>
                  }

                </View>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {/* <Image
                  source={require("../../../assets/Others_PleaseSpecify.png")}
                  resizeMode="contain"
                  style={{
                    width: width / 1.5,
                    marginRight: 8,
                    height: height / 10
                  }}
                /> */}
                <View style={{
                  width: width / 1.5,
                  height: height / 10,

                }}>

                  <Item rounded success style={{ backgroundColor: "#42bcf5", color: "#000" }}>
                    <Input placeholder='Other - Please Specify' style={{ color: "#000" }}
                      onChangeText={otherSpecify => this.setState({ otherSpecify })}
                      value={this.state.otherSpecify} />
                    {
                      (this.state.otherSpecify !== "") ?
                        <TouchableOpacity>

                          <Icon name='checkmark-circle' onPress={() => this.send_interest_Database(this.state.otherSpecify)} />
                        </TouchableOpacity>
                        : (this.state.SendInt === true) ?
                          <View style={[styles.container, styles.horizontal]}>

                            <ActivityIndicator size="small" color="#000000" />

                          </View>
                          : null
                    }

                  </Item>


                </View>


              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-end"
  },
  horizontal: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: 10
  }
})

function mapStateToProps(state) {
  return {
    userID: state.authReducer.userID,
    phoneNumber: state.authReducer.phoneNumber,
    userDetail: state.appReducer.userDetail,
    userRegister_Uid: state.authReducer.userRegister_Uid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createProfile: obj => dispatch(createProfileAction(obj))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);
