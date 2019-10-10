import React, { Component } from "react";

import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import User from "../SignIn/User";
import firebase from "react-native-firebase";
const { height, width } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import { connect } from 'react-redux';
import { All_Message_Action } from '../../Store/Actions/AppAction';
import { Thumbnail } from 'native-base'


class ChatScreen extends Component {
  constructor(props) {
    super(props);
    // console.log(props, 'user data for chat')
    this.state = {
      person: {
        name: props.navigation.state.params.name,
        phone: props.navigation.state.params.uid,
        Email: props.navigation.state.params.email,
        url: props.navigation.state.params.url
      },
      textMessage: "",
      messageList: [],
      Meraj: props.navigation.state.params.name,
      userName: "",
      // monthToStart: ''
    };
    this.onEndReachedCalledDuringMomentum = true;

  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: params.name,
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      headerLeft: (
        // <Ionicons
        //   name="ios-person"
        //   size={width / 14}
        //   color="#fff"
        //   style={{ marginLeft: 15 }}
        // />
        <Thumbnail
          size={width / 14}
          // square
          small
          style={{ marginLeft: 15, borderRadius: 30 / 4 }}
          source={{ uri: params.url }} />
      ),
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
            onPress={() => navigation.goBack()}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 5
      }
    };
  };

  componentDidMount() {

    let meraj = this.props.navigation.state.params.name
    this.setState({
      userName: meraj
    })

  }

  convertDate = time => {
    var timestamp = time.toString().substring(0, 10)
    const date = new Date(timestamp * 1000)
    datevalues = [
      currentDate = date.getDate(),
      currentMonth = date.getMonth() + 1,
      currentyear = date.getFullYear(),
    ]


    // console.log("CURRENT DATE", date)
    return datevalues[0] + "/" + datevalues[1] + "/" + datevalues[2];
  }



  convertTime = time => {
    let d = new Date(time);

    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();



    // if (c.getDay() !== d.getDay()) {
    //     result = d.getDay() + "" + d.getMonth() + "" + result;
    // }
    return result;

  };
  componentWillMount() {

    let userID = this.props.userID.uid;
    const user_ID = this.state.person.phone
    this.props.Get_All_Message(userID, user_ID)

    // firebase
    //   .database()
    //   .ref("messages")
    //   .child(userID)
    //   .child(this.state.person.phone)
    //   .on("child_added", value => {
    //     this.setState(prevState => {
    //       return {
    //         messageList: [...prevState.messageList, value.val()]
    //       };
    //     });
    //   });
    const totaldata = this.props.Get_All_Message.length
    this.setState({ monthToStart: totaldata })

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.All_Message, "nextProps")
    if (this.props.All_Message !== nextProps.All_Message) {
      this.setState({
        messageList: nextProps.All_Message,

      })
    }
  }
  sendMessage = async () => {
    // let userPhone = await AsyncStorage.getItem('user')
    // let userPhone =this.props.phoneNumber;
    let userID = this.props.userID.uid;
    let email = this.props.userDetail.email;
    let SenderName = this.props.userDetail.name

    if (this.state.textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(userID)
        .child(this.state.person.phone)
        .push().key;

      let updates = {};


      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: userID,
        SenderEmail: email,
        ReceiverEmail: this.state.person.Email

      };
      updates[
        `messages/${userID}/${this.state.person.phone}/${msgId}`
      ] = message;
      updates[
        `messages/${this.state.person.phone}/${userID}/${msgId}`
      ] = message;

      // message1[
      //   `message1/${userID}`
      // ]

      firebase.database().ref('messages1').child(userID).push({
        message: this.state.textMessage,
        user_id: this.state.person.phone,
        time: new Date().getTime(),
        SenderEmail: email,
        ReceiverEmail: this.state.person.Email,
        SenderName: SenderName

      })


      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ textMessage: "" });
    }
  };
  renderRow = ({ item }) => {
    // console.log(item, 'user list message')

    return (
      <TouchableWithoutFeedback onLongPress={() => this.someHandlerFunction(item)}>
        <View
          style={{
            // flexDirection: "row",
            width: "90%",
            alignSelf: item.from === this.props.userID.uid ? "flex-end" : "flex-start",
            backgroundColor: item.from === this.props.userID.uid ? "#2967cc" : "#e1e2e3",
            borderRadius: 8,
            marginBottom: 10,
            // borderTopRightRadius: -10,

          }}
        >
          {
            (item.message === "you deleted this message") ?

              <Text
                style={{
                  //color: "#fff",
                  color: item.from === this.props.userID.uid ? "#fff" : "#000",
                  padding: 12,
                  paddingBottom: 10,
                  fontSize: 16,
                  fontStyle: 'italic'
                  // alignItems: "flex-start"
                }}
              >
                <Octicons
                  name="circle-slash"
                  size={width / 20}

                  color="#fff"
                  style={{ marginLeft: 15, marginTop: 15, marginTop: 10 }}
                /> {item.message}

              </Text>
              : <Text
                style={{
                  //color: "#fff",
                  color: item.from === this.props.userID.uid ? "#fff" : "#000",
                  padding: 10,
                  fontSize: 16,
                  // fontStyle: 'italic'
                  // alignItems: "flex-start"
                }}
              >
                {item.message}

              </Text>
          }
          <Text
            style={{
              color: item.from === this.props.userID.uid ? "#fff" : "#000",
              padding: 5,
              fontSize: 12,
              alignItems: "center",
              justifyContent: 'center',
              alignSelf: 'flex-end',
              textAlign: "center"
            }}
          >
            {this.convertTime(item.time)} {"  "}

            <Text
              style={{
                color: item.from === this.props.userID.uid ? "#fff" : "#000",
                padding: 5,
                fontSize: 12,
                alignItems: "center",
                justifyContent: 'center',
                alignSelf: 'flex-end',
                textAlign: "center"
              }}
            >
              {this.convertDate(
                item.time
              )}
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  FriendMessageDelete = (item) => {
    const my_id = this.props.userID.uid;
    const friend_id = item.from;
    console.log(my_id, friend_id);
    var ref = firebase.database().ref("messages").child(`${my_id}`).child(`${friend_id}`);
    ref.orderByChild("message").equalTo(item.message).once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.remove({ message: item.message });
      })
    })

  }

  deleteMyMesssage = (item) => {
    const my_id = this.props.userID.uid;
    const friend_id = this.state.person.phone;
    console.log(my_id, friend_id, item.message);
    var ref = firebase.database().ref("messages").child(`${my_id}`).child(`${friend_id}`);
    ref.orderByChild("message").equalTo(item.message).once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.remove({ message: item.message });
      })
    })

  }
  delete_for_everyone = (item) => {
    const my_id = this.props.userID.uid;
    const friend_id = this.state.person.phone;
    console.log(my_id, friend_id);
    var ref = firebase.database().ref("messages").child(`${my_id}`).child(`${friend_id}`);
    ref.orderByChild("message").equalTo(item.message).once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.update({ message: "you deleted this message" });
      })
    })
    var ref = firebase.database().ref("messages").child(`${friend_id}`).child(`${my_id}`);
    ref.orderByChild("message").equalTo(item.message).once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.update({ message: "This message was deleted" });
      })
    })
  }

  someHandlerFunction = (item) => {

    if (item.from === this.props.userID.uid) {
      Alert.alert(
        '',
        'Delete message?',
        [
          {
            text: 'DELETE FOR EVERYONE', onPress: () => {
              this.delete_for_everyone(item)
            }
          },
          {
            text: 'CANCEL',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'DELETE FOR ME', onPress: () => this.deleteMyMesssage(item) },
        ],
        { cancelable: false },
      );
    } else if (item.from !== this.props.userID.uid) {

      Alert.alert(
        '', `Delete message from ${this.state.person.name}`,
        [
          { text: 'CANCEL' },
          {
            text: 'DELETE FOR ME',
            onPress: () => {
              this.FriendMessageDelete(item)

            }
            ,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  }


  render() {
    return (

      // <SafeAreaView>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
        <FlatList
          // ref={ref => (this.flatList = ref)}
          ref={(ref) => { this.myFlatListRef = ref }}
          style={{ padding: 10, height: height * 0.6 }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => { this.myFlatListRef.scrollToEnd({ animated: true }) }}
          onLayout={() => { this.myFlatListRef.scrollToEnd({ animated: true }) }}


        />
        <View style={{
          padding: 5,
          margin: 0
        }}>


          <KeyboardAvoidingView behavior="padding">
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
            }}>

              <TextInput
                value={this.state.textMessage}
                onChangeText={textMessage => this.setState({ textMessage })}
                style={{
                  color: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  fontSize: 18,
                  flex: 1,
                }}
                underlineColorAndroid="transparent"
                placeholder="Type Message..."
                multiline={true}
                numberOfLines={0}
              // autoFocus={true}
              />
              <TouchableOpacity onPress={this.sendMessage}>
                <Text
                  style={{
                    alignSelf: 'center',
                    // alignItems: 'flex-end',
                    // justifyContent: 'flex-end',
                    color: 'lightseagreen',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 10,
                  }}
                > <Ionicons
                    name="ios-send"
                    size={width / 10}
                    color="#2892de"
                    style={{ marginLeft: 5, marginTop: 5 }}
                  />

                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>

    );
  }
}
function mapStateToProps(state) {
  console.log(state.authReducer.All_Message, "state.authReducer.All_Message")
  return {
    phoneNumber: state.authReducer.phoneNumber,
    userID: state.authReducer.userID,
    All_Message: state.appReducer.All_Message,
    userDetail: state.appReducer.userDetail,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    Get_All_Message: (user, user_ID) => {
      dispatch(All_Message_Action(user, user_ID));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);