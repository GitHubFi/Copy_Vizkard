import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Icon } from 'native-base';
const { width, height, scale, fontScale } = Dimensions.get("window");
import firebase from "react-native-firebase";
import User from "../SignIn/User";
import { connect } from 'react-redux';

const arrList = [
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "a",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "b",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "c",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "d",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "e",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  },
  {
    imageUrl:
      "https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg",
    key: "f",
    name: "Jill Sanders",
    message: "I’ll meet you at 4 pm",
    timestamp: "07:35 pm"
  }
];
class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // person: {
      //   name: props.navigation.state.params.name,
      //   phone: props.navigation.state.params.uid,
      // },
      messageList: [],
      users: [],
      // badge_count: null

    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
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

  async componentWillMount() {
    // let userPhone = await AsyncStorage.getItem('user');
    let userID = this.props.userID.uid;
    let dbRef = firebase.database().ref(`users/${userID}/FriendList`);
    dbRef.on("child_added", async val => {
      let person = val.val();
      // console.log(person, "all users")
      person.phone = val.key;
      // console.log(person.phone, "who user number--------------------------------")

      if (person.uid === userID) {

      } else {
        // console.log(person, "own user");
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
            // phone: [...prevState.phone, person],

          };
        });
        //this.props.GETUSERRequest(this.state.users)
      }

    });


    firebase
      .database()
      .ref("messages")
      .child(userID)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });


    // firebase.notifications().getBadge()
    //   .then(count => {
    //     count++
    //     firebase.notifications().setBadge(count);
    //     console.log('Doing great', count);
    //     this.setState({
    //       badge_count: count
    //     })
    //   })
    //   .then(() => {
    //     console.log('Doing great')
    //   })
    //   .catch(error => {
    //     console.log('fail to count')
    //   })
  }
  render() {
    console.log(this.state.users)
    return (
      <View style={{
        backgroundColor: "#ffffff", flex: 1,
      }}>

        <FlatList
          data={this.state.users}
          renderItem={({ item }) => (
            item ?
              <List >
                <ListItem avatar onPress={() =>
                  this.props.navigation.navigate("ChatScreen", item)
                }>
                  <Left>
                    <Thumbnail
                      square style={{ borderRadius: 30 / 4 }}
                      source={{ uri: item.url }} />

                  </Left>
                  <Body>
                    <Text style={{ fontSize: width / 20, }}> {item.name}</Text>
                    <Text note> {item.email}</Text>
                  </Body>
                  <Right>

                    {/* <Text>{this.state.badge_count}</Text> */}
                  </Right>
                </ListItem>
              </List>
              : null

          )}
          keyExtractor={item => item.uid}
        />


      </View>





    );
  }
}

function mapStateToProps(state) {

  return {
    // userdDetail: state.appReducer.userdDetail,
    phoneNumber: state.authReducer.phoneNumber,
    userID: state.authReducer.userID,

  }
}
function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)