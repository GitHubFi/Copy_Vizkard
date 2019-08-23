import React, { Component } from "react";
import { View, Dimensions, Image, Text, ScrollView, AsyncStorage, Alert, TouchableHighlight, Modal, TouchableOpacity, Share } from "react-native";
const { width, height } = Dimensions.get("window");
import { List, ListItem } from "native-base";
import { connect } from "react-redux";
import { profileAction, GetUserAction } from '../../Store/Actions/AppAction'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Add_Expreience from './Add_Expreience';
import Add_Skill from './Add_Skill';
import Users from "../SignIn/User";
import firebase from "react-native-firebase";
import ShowSkill from "./ShowSkill";
import Edit_Experience from "./Edit_Experience";
import AddTagLine from "./AddTagLine";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      total_users: [],
      modalVisible: false,
      modalVisible1: false,
      modalVisibleTagline: false,
      total_experience: [],
      modalVisibleEdit: false,
      exp: '',
      Experience: '',
      TagSate: ''
    };

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible1(visible) {
    this.setState({ modalVisible1: visible });
  }

  setModalVisible3(visible, value, Experience) {
    this.setState({ modalVisibleEdit: visible, exp: value, Experience: Experience });
    // Alert.alert(value, "Edit experience ")
  }

  setModalVisibleTagLine(visible) {
    this.setState({ modalVisibleTagline: visible });
  }




  async componentWillMount() {
    let userID = this.props.userID.uid;
    let dbRef = firebase.database().ref(`users/${userID}/FriendList`);
    dbRef.on("child_added", val => {
      let person = val.val();
      console.log(person, "all users")
      person.phone = val.key;
      console.log(person.phone, "who user number--------------------------------")

      if (person.uid === userID) {

      } else {
        console.log(person, "own user");
        this.setState(prevState => {
          return {
            total_users: [...prevState.total_users, person],

          };
        });

      }

    });


    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user, "user available")
        console.log(user._auth._user._user.uid, "uid")
        await AsyncStorage.setItem('User', user._auth._user._user.uid)

        // ...
      } else {
        // ...
        console.log('errorss')
      }
    });
    const userToken = await AsyncStorage.getItem("User");
    const id = this.props.userID.uid


    this.props.GetExperience(id);
    // this.props.userDetail.name ? this.props.navigation.navigate('Profile') : this.props.navigation.navigate('CreateProfile')

    setTimeout(() => {
      this.updateState()

    }, 0);

    this.props.profileData(userID)
  }


  updateState = () => {
    let userID = this.props.userID.uid;

    firebase
      .database()
      .ref("users")
      .child(userID)
      .child('Experience')
      .on("child_added", value => {

        this.setState(prevState => {
          return {
            total_experience: [...prevState.total_experience, value.val()]
          };
        });
      });

    firebase
      .database()
      .ref("users")
      .child(userID)
      .child('TagLine')
      .child("post")
      .on("child_added", value => {

        this.setState({
          TagSate: value.val()
        })
      });
    this.props.profileData(userID);
    this.props.GetExperience(userID);
  }


  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React www.google.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    console.log("all Exp", this.state.total_experience)
    const { userDetail } = this.props
    return (

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: "#0071CE",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 0.5,
              marginTop: 5, // marginTop: width / 20, 8/8/2019
              marginLeft: width / 20
            }}
          >
            <Text
              style={{
                fontSize: width / 20,
                fontWeight: "bold",
                color: "#fff",
                paddingRight: 5,
              }}
            >
              {this.state.total_users.length}{" "}
              <Ionicons
                name="md-people"
                size={width / 15}
                color="#fff"
                style={{ marginLeft: 15, paddingLeft: 10 }}
              />
            </Text>
            <Text
              style={{
                fontSize: width / 28, // /20
                // fontSize:height /60,
                fontWeight: "bold",
                color: "#fff",

              }}
            >
              {/* Hamza Khan
                 */}

              {
                userDetail.name ? userDetail.name : null
              }              </Text>
            <Text
              style={{
                fontSize: width / 30, // /20
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              {/* Graphic Designer
                 */}
              {
                userDetail.occupation ? userDetail.occupation : null
              }
            </Text>

            <Text
              style={{
                fontSize: width / 27,
                fontWeight: "bold",
                color: "#fff",
                marginTop: width / 33
              }}
            >
              Say hi,to {userDetail.company ? userDetail.company : null}{"\n"}


            </Text>
            <Text style={{
              fontSize: width / 27,
              marginTop: width / 50,
              color: "#fff",
            }}
              onPress={() => this.setModalVisibleTagLine(true)}
            >
              Add Tag Line</Text>
            <Modal
              animationType="fade"
              transparent={false}
              style={{ backgroundColor: "black" }}
              visible={this.state.modalVisibleTagline}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                console.log("cancel")
              }}
            >
              <View style={{ marginTop: 22, padding: 10 }}>
                <View>


                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisibleTagLine(!this.state.modalVisibleTagline);
                    }}>
                    {/* <Text style={{ fontSize: width / 20, fontWeight: "bold" }}>
                        Cancel
                        </Text> */}
                    <MaterialCommunityIcons
                      name="keyboard-backspace"
                      size={width / 15}
                      color="#000"
                      style={{}}
                    />
                  </TouchableHighlight>

                </View>
              </View>
              <AddTagLine value={this.state.TagSate} />

            </Modal>
            <Text
              style={{
                fontSize: width / 27,
                fontWeight: "bold",
                color: "#fff",
                marginTop: width / 35
              }}

            >

              {this.state.TagSate}
            </Text>
          </View>

          <View
            style={{
              flex: 0.5,
              marginRight: 5,
              marginTop: 10,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
            >
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}
              >
                Upload photo
                </Text>
              <TouchableOpacity onPress={() => Alert.alert("update profile")}>
                <Image
                  source={require("../../../assets/update.png")}
                  resizeMode="contain"
                  style={{ width: width / 14, height: height / 20 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
            >
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}>
                Share Your Vizkard
                </Text>
              <TouchableOpacity onPress={this.onShare}>
                <Image
                  source={require("../../../assets/Share.png")}
                  resizeMode="contain"
                  style={{ width: width / 14, height: height / 20 }}

                />
              </TouchableOpacity>

            </View>
            <View
              style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
            >
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}
                onPress={() => Alert.alert("MAnage profile")}>
                Manage Your Profile
                </Text>
              <TouchableOpacity onPress={() => Alert.alert("Manage")}>
                <Image
                  source={require("../../../assets/complete.png")}
                  resizeMode="contain"
                  style={{ width: width / 14, height: height / 20 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.2,
                flexWrap: "wrap",
                alignSelf: "flex-end",
                marginBottom: 10
              }}
            >
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}>
                Promote Your Self
                </Text>
              <Image
                source={require("../../../assets/promoteyourself.png")}
                resizeMode="contain"
                style={{ width: width / 14, height: height / 20 }}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 0.8, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.4,
              backgroundColor: "#0071ce",
              textAlign: "center",
              alignItems: "center"
            }}
          >
            {/* <View style={{ flex: 0.1, marginTop: 5 }} >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Focus / Skills</Text>
            </View> */}
            <View
              style={{ flexDirection: "row" }}
            >
              <Text style={{ color: "#fff", marginTop: 0, marginRight: 4, fontWeight: "bold" }}
                onPress={() => {
                  this.setModalVisible1(true);
                }}>
                Add your skills
                </Text>

              {/* <Image
                source={require("../../../assets/addskill.png")}
                resizeMode="contain"
                style={{ width: width / 16, height: height / 20 }}
              /> */}
              <Modal
                animationType="fade"
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisible1}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.');
                  console.log("cancel")
                }}
              >
                <View style={{ marginTop: 22, padding: 10 }}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible1(!this.state.modalVisible1);
                      }}>

                      <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={width / 15}
                        color="#000"
                        style={{}}
                      />
                    </TouchableHighlight>

                  </View>
                </View>
                <Add_Skill />

              </Modal>
            </View>
            <View style={{ flex: 0.9 }}>
              <ShowSkill />
            </View>

            {/* <View style={{ flex: 0.6 }}>
              <Text style={{ color: "#fff" }}>On the Web</Text>
              <View
                style={{
                  width: width / 5,
                  marginTop: 10,
                  height: height / 20,
                  flexWrap: "wrap",
                  backgroundColor: "#fff",
                  borderRadius: 10
                }}
              >
                <Image
                  source={require("../../../assets/expirence.png")}
                  resizeMode="contain"
                  style={{
                    width: width / 16,
                    height: height / 20,
                    borderRadius: 10
                  }}
                />
                <Input
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    fontSize: width / 36
                  }}
                  placeholder="Link"
                />
              </View>
              <View
                style={{
                  width: width / 5,
                  marginTop: 10,
                  height: height / 20,
                  flexWrap: "wrap",
                  backgroundColor: "#fff",
                  borderRadius: 10
                }}
              >
                <Image
                  source={require("../../../assets/expirence.png")}
                  resizeMode="contain"
                  style={{
                    width: width / 16,
                    height: height / 20,
                    borderRadius: 10
                  }}
                />
                <Input
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    fontSize: width / 36
                  }}
                  placeholder="Link"
                />
              </View>
              <View
                style={{
                  width: width / 5,
                  marginTop: 10,
                  height: height / 20,
                  flexWrap: "wrap",
                  backgroundColor: "#fff",
                  borderRadius: 10
                }}
              >
                <Image
                  source={require("../../../assets/expirence.png")}
                  resizeMode="contain"
                  style={{
                    width: width / 16,
                    height: height / 20,
                    borderRadius: 10
                  }}
                />
                <Input
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    fontSize: width / 36
                  }}
                  placeholder="Link"
                />
              </View>
            </View> */}
          </View>
          <View style={{ flex: 0.7, marginLeft: 15 }}>
            <ScrollView>

              <TouchableHighlight>
                <Text
                  style={{
                    fontSize: width / 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    color: "#0033a0"
                  }}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  Add Work Experience
              </Text>
              </TouchableHighlight>

              <Modal
                animationType="fade"
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.');
                  console.log("cancel")
                }}
              >
                <View style={{ marginTop: 22, padding: 10 }}>
                  <View>


                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      {/* <Text style={{ fontSize: width / 20, fontWeight: "bold" }}>
                        Cancel
                        </Text> */}
                      <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={width / 15}
                        color="#000"
                        style={{}}
                      />
                    </TouchableHighlight>

                  </View>
                </View>
                <Add_Expreience />

              </Modal>

              <Text>-----------------------------------------------------</Text>
              {/* <Text
                style={{
                  fontSize: width / 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  color: "#0033a0",

                }}
              >


              </Text> */}


              {
                this.state.total_experience.slice(0).reverse().map((value, id) => {
                  return <View key={id} >


                    <Text
                      // onPress={() => this.props.navigation.navigate('Edit_Experience')}
                      onPress={() => {
                        this.setModalVisible3(true, value.Company, value.Experience);
                      }}
                      style={{
                        fontSize: width / 22,
                        paddingTop: 5,
                        paddingBottom: 10,
                        fontWeight: "bold"
                      }}
                    >
                      {value.Company}
                    </Text>


                    <Text
                      // onPress={() => Alert.alert("edit Experience", value.Experience)}
                      style={{
                        fontSize: width / 22,
                        paddingTop: 0,
                        paddingBottom: 10,
                        fontWeight: "normal"
                      }}>{value.Experience}
                    </Text>




                    <Modal
                      animationType="fade"
                      transparent={false}
                      style={{ backgroundColor: "black" }}
                      visible={this.state.modalVisibleEdit}
                      onRequestClose={() => {

                        console.log("cancel")
                      }}
                    >
                      <View style={{ marginTop: 22, padding: 10 }}>
                        <View>
                          <TouchableHighlight
                            onPress={() => {
                              this.setModalVisible3(!this.state.modalVisibleEdit);
                            }}
                          >

                            <MaterialCommunityIcons
                              name="keyboard-backspace"
                              size={width / 15}
                              color="#000"
                              style={{}}
                            />
                          </TouchableHighlight>
                        </View>
                      </View>
                      <Edit_Experience name={this.state.exp} Experience={this.state.Experience} />
                    </Modal>
                  </View>
                })
              }
            </ScrollView>
          </View>
        </View>
      </View>


      // </ScrollView>
    );
  }
}
function mapStateToProps(state) {

  console.log(state.appReducer.All_Experience, "state.appReducer.User_Experience");
  return {
    userID: state.authReducer.userID, //as object
    userDetail: state.appReducer.userDetail,
    phoneNumber: state.authReducer.phoneNumber,
    User_Experience: state.appReducer.User_Experience,
    All_Experience: state.appReducer.All_Experience


  };
}
function mapDispatchToProps(dispatch) {
  return {
    profileData: (userID) => {
      dispatch(profileAction(userID));
    },
    GetExperience: (userID) => {
      dispatch(GetUserAction(userID))
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
