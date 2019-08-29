import React, { Component } from "react";
import {
  View, Dimensions, Image, Text, ScrollView,
  ActivityIndicator, AsyncStorage, Alert, TouchableHighlight,
  Modal, TouchableOpacity, Share, Button
} from "react-native";
import ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get("window");
import { List, ListItem } from "native-base";
import { connect } from "react-redux";
import { profileAction, GetUserAction, getSkillAction } from '../../Store/Actions/AppAction'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Add_Expreience from './Add_Expreience';
import Add_Skill from './Add_Skill';
import Users from "../SignIn/User";
import firebase from "react-native-firebase";
import ShowSkill from "./ShowSkill";
import Edit_Experience from "./Edit_Experience";
import AddTagLine from "./AddTagLine";
// import RNFetchBlob from 'react-native-fetch-blob';
import Manage_Profile from './Manage_Profile'
import ShowPromote from './ShowPromote'

const options = {
  title: 'Select Profile Image',
  chooseFromLibraryButtonTitle: "Choose Photo from Library",
  takePhotoButtonTitle: null,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
      modalVisibleManage: false,
      modalVisiblePromoteYourSeld: false,
      exp: '',
      Experience: '',
      TagSate: '',
      avatarSource: null,
      url: null,
      uploading: false
    };

  }


  Manage_Profile(visible) {
    this.setState({ modalVisibleManage: visible });

  }
  PromoteYourSeld(visible) {
    this.setState({ modalVisiblePromoteYourSeld: visible });
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

  selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response !== null) {


        console.log('Response = ', response.uri);
        const uri = response.uri

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          let mime = 'image/jpg';
          const urf = firebase.storage().ref('post').child(response.fileName).put(uri, { contentType: 'image/jpeg' })
          urf.on('state_changed',
            (snapshot) => {
              // console.log(snapshot)
              this.setState({ uploading: true })
              // progrss function....
              // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              // this.setState({ progress })

            },
            (error) => {
              console.log(error);
              this.setState({ uploading: false })
              // error function ....
            },
            () => {
              // complete function...
              firebase.storage().ref('post').child(response.fileName).getDownloadURL().then(url => {

                // console.log(url);
                // console.log(id);
                this.setState({
                  url,
                  uploading: true
                  // progress: null,
                  // image: null
                })
              }).then(() => {
                const id = firebase.auth().currentUser.uid
                this.setState({
                  uploading: false
                })
                Alert.alert("Successfully Upload Profile Image")
                firebase.database().ref("users").child(`${id}/userDetail`).update({
                  url: this.state.url,

                }).then(() => {
                  this.setState({
                    uploading: false
                  })
                  // Alert.alert("Successfully Upload Profile Image")
                })

              })
            })
        }

      } else {

      }

    });
  }




  async componentWillMount() {
    let userID = this.props.userID.uid;
    const id = firebase.auth().currentUser.uid;
    let dbRef = firebase.database().ref(`users/${id}/FriendList`);
    dbRef.on("child_added", val => {
      let person = val.val();
      console.log(person, "all users")
      person.phone = val.key;
      console.log(person.phone, "who user number--------------------------------")

      if (person.uid === id) {

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
    // const id = this.props.userID.uid


    // const id = firebase.auth().currentUser.uid
    this.props.GetExperience(id);
    this.props.getSkill(id)
    this.props.profileData(id)
    // this.props.userDetail.name ? this.props.navigation.navigate('Profile') : this.props.navigation.navigate('CreateProfile')

    setTimeout(() => {
      this.updateState()

    }, 0);

    this.props.profileData(id)
  }


  updateState = () => {
    let userID = this.props.userID.uid;
    const id = firebase.auth().currentUser.uid
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
      .child(id)
      .child('TagLine')
      .child("post")
      .on("child_added", value => {

        this.setState({
          TagSate: value.val()
        })
      });
    this.props.profileData(userID);
    this.props.GetExperience(userID);
    this.props.getSkill(userID)
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
              {userDetail.company ? userDetail.company : null}{"\n"}


            </Text>
            <Text style={{
              fontSize: width / 27,
              marginTop: width / 55,
              color: "#fff",
            }}
              onPress={() => this.setModalVisibleTagLine(true)}
            >
              Add Tag Line</Text>
            <Modal
              animationType='slide'
              transparent={false}
              style={{ backgroundColor: "black" }}
              visible={this.state.modalVisibleTagline}
              onRequestClose={() => {
                this.setModalVisibleTagLine(!this.state.modalVisibleTagline)
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
                marginTop: width / 40
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
              {
                (this.state.uploading === true) ?
                  <ActivityIndicator size="small" color="#ffffff" />

                  : <View style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}>
                    <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}
                      onPress={this.selectImage}
                    >
                      Upload photo
                </Text>
                    <TouchableOpacity onPress={this.selectImage}>
                      <Image
                        source={require("../../../assets/update.png")}
                        resizeMode="contain"
                        style={{ width: width / 14, height: height / 20 }}
                      />
                    </TouchableOpacity>
                  </View>
              }

            </View>
            <View
              style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
            >
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }} onPress={this.onShare}>
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
                onPress={() => this.Manage_Profile(true)}>
                Manage Your Profile
                </Text>
              <TouchableOpacity onPress={() => this.Manage_Profile(true)}>
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
              <Text style={{ marginRight: 5, color: "#fff", paddingTop: 12 }}
                onPress={() => { this.PromoteYourSeld(true) }}>
                Promote Your Self
                </Text>
              <TouchableOpacity onPress={() => { this.PromoteYourSeld(true) }}>


                <Image
                  source={require("../../../assets/promoteyourself.png")}
                  resizeMode="contain"
                  style={{ width: width / 14, height: height / 20 }}
                />
              </TouchableOpacity>
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
                animationType="slide"
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisible1}
                onRequestClose={() => {
                  this.setModalVisible1(!this.state.modalVisible1)
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
                animationType='slide'
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible)
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

              {
                (this.props.All_Experience !== null) ?
                  this.props.All_Experience.map((value, id) => {
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
                        animationType='fade'
                        transparent={false}
                        style={{ backgroundColor: "black" }}
                        visible={this.state.modalVisibleEdit}
                        onRequestClose={() => {
                          this.setModalVisible3(!this.state.modalVisibleEdit)
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
                  : <Text
                    // onPress={() => Alert.alert("edit Experience", value.Experience)}
                    style={{
                      fontSize: width / 30,
                      paddingTop: 0,
                      paddingBottom: 10,
                      // fontWeight: "normal"
                    }}>No Work Experience Found please add
                  </Text>
              }
              <Modal
                animationType='slide'
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisibleManage}
                onRequestClose={() => {
                  this.Manage_Profile(!this.state.modalVisibleManage)
                  console.log("cancel")
                }}
              >
                <View style={{ marginTop: 22, padding: 10 }}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        this.Manage_Profile(!this.state.modalVisibleManage);
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
                <Manage_Profile />
              </Modal>
              <Modal
                animationType='slide'
                transparent={false}
                style={{ backgroundColor: "black" }}
                visible={this.state.modalVisiblePromoteYourSeld}
                onRequestClose={() => {
                  this.PromoteYourSeld(!this.state.modalVisiblePromoteYourSeld)
                  console.log("cancel")
                }}
              >
                <View style={{ marginTop: 22, padding: 10 }}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        this.PromoteYourSeld(!this.state.modalVisiblePromoteYourSeld);
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
                <ShowPromote />
              </Modal>
            </ScrollView>
          </View>
        </View>
      </View>


      // </ScrollView>
    );
  }
}
function mapStateToProps(state) {

  console.log(state.appReducer.All_Skill, "state.appReducer.User_Skills");
  return {
    userID: state.authReducer.userID, //as object
    userDetail: state.appReducer.userDetail,
    phoneNumber: state.authReducer.phoneNumber,
    User_Experience: state.appReducer.User_Experience,
    All_Experience: state.appReducer.All_Experience,
    All_Skill: state.appReducer.All_Skill


  };
}
function mapDispatchToProps(dispatch) {
  return {
    profileData: (userID) => {
      dispatch(profileAction(userID));
    },
    GetExperience: (userID) => {
      dispatch(GetUserAction(userID))
    },
    getSkill: (userID) => {
      dispatch(getSkillAction(userID));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
