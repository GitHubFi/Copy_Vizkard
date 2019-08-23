import React, { Component } from "react";
import { View, Dimensions, Image, Text, ScrollView, TouchableOpacity, Alert, AsyncStorage } from "react-native";
const { width, height } = Dimensions.get("window");
import { Item, Input, Content, Fab, Button, Icon } from "native-base";
import { connect } from "react-redux";
import { friendRequestAction, FriendRequestList, acceptRequestAction } from '../../Store/Actions/AppAction';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
// import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from "react-native-firebase";
class PublicProfileDetail extends Component {
    constructor(props) {
        // console.log("llll", props.user, 'lllll ')
        super(props);
        this.state = {

            active: false,
            isFriend: false,
            name: '',
            userId: null,
            status: {},
            Request_Status: {},
            AcceptID: "",
            users: [],
            phone: [],
            MobileNumber: "",
            Detail: {},
            total_experience: [],
            total_Skills: [],
            total_Friends: [],
            TagSate: null




        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Contacts",
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
            )
        };
    };

    async componentWillUnmount() {
        this.props.navigation.setParams({
            detailUser: null
        })
    }

    async componentWillMount() {
        let userPhone = await AsyncStorage.getItem('user')
        let dbRef = firebase.database().ref(`users/${userPhone}/FriendList`);
        dbRef.on("child_added", async val => {
            let person = val.val();
            // console.log(person, "all users")
            person.phone = val.key;
            // console.log(person.phone, "who user number--------------------------------")

            if (person.phone === userPhone) {

            } else {
                // console.log(person, "own user");
                this.setState(prevState => {
                    return {
                        users: [...prevState.users, person],
                        phone: [...prevState.phone, person.phoneNumber],

                    };
                });
                this.props.GETUSERRequest(this.state.users);
            }

        });
        const Curr = this.props.userID.uid;
        let userInfo = firebase.database().ref(`users/${Curr}/userDetail`);
        userInfo.on("value", val => {
            let Detail = val.val();
            this.setState({
                Detail: Detail
            })
        })


        const CurrUser = this.props.userID.uid;
        let userDetail = this.props.navigation.getParam('detailUser');
        let user_uid = userDetail.uid;
        let request = firebase.database().ref(`Friend Request/${CurrUser}/${user_uid}`);
        request.on("child_added", val => {
            let status = val.val();
            this.setState({
                status: status
            })
            // console.log(status, "STATUS FROM FIREBASE ")
        });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
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
            .child(user_uid)
            .child('Skills')
            .on("child_added", value => {

                this.setState(prevState => {
                    return {
                        total_Skills: [...prevState.total_Skills, value.val()]
                    };
                });
            });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('FriendList')
            .on("child_added", value => {

                this.setState(prevState => {
                    return {
                        total_Friends: [...prevState.total_Friends, value.val()]
                    };
                });
            });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('TagLine')
            .child("post")
            .on("child_added", value => {
                this.setState({
                    TagSate: value.val()
                })
            });


    }


    componentDidMount() {
        const CurrUser = this.props.userID.uid;
        let userDetail = this.props.navigation.getParam('detailUser');
        let user_uid = userDetail.uid;
        let request2 = firebase.database().ref(`Friend Request/${user_uid}/${CurrUser}`);
        request2.on("child_added", val => {
            let Request_Status = val.val();
            this.setState({
                Request_Status: Request_Status
            })
            // console.log(status, "STATUS FROM FIREBASE ")
        });



    }
    async sendFriendRequest(userDetail) {
        let userPhone = await AsyncStorage.getItem('user');
        Alert.alert("Sent Friend Request to", userDetail.name)
        this.setState({
            isFriend: true,
            AcceptID: userDetail.phoneNumber
        });
        if (userDetail.name !== "") {
            this.setState({
                name: userDetail.name,
                userId: userDetail.uid
            })
        }
        const CurrUser = this.props.userID.uid
        const friendUid = userDetail.uid
        this.props.sendFriendRequestAction(userDetail, CurrUser, friendUid);
    }

    AcceptRequest(userDetail) {
        const CurrUser = this.props.userID.uid;
        const friendUid = userDetail.uid;
        const Current_User_Detail = this.state.Detail
        this.props.Accept_Request_Action(userDetail, Current_User_Detail, CurrUser, friendUid)


    }

    render() {
        let userDetail = this.props.navigation.getParam('detailUser');
        // console.log(this.state.Detail, "STATUS====Detail")
        return (
            // <ScrollView
            //     contentContainerStyle={{
            //         height: height - 80,

            //         width
            //     }}
            //     keyboardDismissMode="interactive"
            //     keyboardShouldPersistTaps="handled"
            // >
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 0.4,
                        backgroundColor: "#0071CE",
                        flexDirection: "row"
                    }}
                >
                    <View
                        style={{
                            flex: 0.5,
                            marginTop: width / 20,
                            marginLeft: width / 20
                        }}
                    >
                        <Text
                            style={{
                                fontSize: width / 18,
                                fontWeight: "bold",
                                color: "#fff"
                            }}
                        >
                            {/* Hamza Khan */}
                            {userDetail.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: width / 26,
                                fontWeight: "bold",
                                color: "#fff"
                            }}
                        >
                            {/* Graphic Designer */}
                            {userDetail.occupation}
                        </Text>
                        <Text
                            style={{
                                fontSize: width / 20,
                                fontWeight: "bold",
                                color: "#fff",
                                paddingRight: 5,
                            }}
                        >
                            {this.state.total_Friends.length}{" "}
                            <Ionicons
                                name="md-people"
                                size={width / 15}
                                color="#fff"
                                style={{ marginLeft: 15, paddingLeft: 10 }}
                            />
                        </Text>

                        <Text
                            style={{
                                fontSize: width / 25,
                                fontWeight: "bold",
                                color: "#fff",
                                marginTop: width / 20
                            }}
                        >
                            Say hi,to {userDetail.company} {"\n"}
                            {
                                (this.state.TagSate !== null) ?

                                    this.state.TagSate
                                    : `No Tag Line Found`
                            }
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
                                (this.state.status.status === "send request") ?

                                    <Entypo.Button

                                        backgroundColor="#3b5998"

                                    >
                                        Sent Request
                                   </Entypo.Button>
                                    : (this.state.status.to === userDetail.uid) ?
                                        <View
                                            style={{ flex: 0.2, flexWrap: "wrap", alignSelf: "flex-end" }}
                                        >
                                            <View style={{
                                                marginRight: 5
                                            }}>

                                                <Entypo.Button

                                                    backgroundColor="#3b5998"
                                                    onPress={this.AcceptRequest.bind(this, userDetail)}
                                                    style={{ marginRight: 5 }}

                                                >
                                                    Accept Request
                                             </Entypo.Button>
                                            </View>
                                            <View style={{
                                                marginLeft: 5
                                            }}>

                                                <Entypo.Button

                                                    backgroundColor="#3b5998"

                                                >
                                                    Decline
                                             </Entypo.Button>
                                            </View>
                                        </View>

                                        :
                                        (this.state.status === 'yes') ?
                                            <Entypo.Button
                                                name="user"
                                                backgroundColor="#3b5998"

                                            >

                                                <Text style={{ color: "#fff" }}>Your are connected with </Text>
                                                <Text style={{ color: "#fff" }}>{userDetail.name}</Text>
                                            </Entypo.Button>
                                            :
                                            <Entypo.Button
                                                name="add-user"
                                                backgroundColor="#3b5998"
                                                onPress={this.sendFriendRequest.bind(this, userDetail)}

                                            >
                                                Add Friend
                                        </Entypo.Button>
                            }

                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.9, flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 0.4,
                            backgroundColor: "#0071ce",
                            textAlign: "center",
                            alignItems: "center"
                        }}
                    >
                        <View style={{ flex: 0.1, marginTop: 10 }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", paddingBottom: 10 }}>Focus / Skills</Text>
                        </View>
                        <ScrollView>
                            <View
                                style={{ flex: 0.3, marginTop: 5 }}
                            >
                                {
                                    (this.state.status === "yes") ?
                                        this.state.total_Skills.slice(0).reverse().map((value, id) => {
                                            return <Text key={id}
                                                style={{
                                                    color: "#fff", marginTop: 5, marginRight: 0,
                                                    marginTop: 0, justifyContent: "center",
                                                    textAlign: "center", paddingTop: 5
                                                }}>
                                                {value.Skill}
                                            </Text>
                                        })
                                        : null
                                }

                                {/* <Image
                                source={require("../../../assets/addskill.png")}
                                resizeMode="contain"
                                style={{ width: width / 16, height: height / 20 }}
                            /> */}
                            </View>
                        </ScrollView>

                        <View style={{ flex: 0.6 }}>
                            {/* <Text style={{ color: "#fff" }}>On the Web</Text> */}
                            {/* <View
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
                            </View> */}
                            {/* <View
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
                            </View> */}
                            {/* <View
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
                            </View> */}
                        </View>
                    </View>
                    <View style={{ flex: 0.7, marginLeft: 15 }}>
                        <Text
                            style={{
                                fontSize: width / 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                color: "#0033a0"
                            }}
                        >
                            Work Expirence

                            </Text>
                        <ScrollView>
                            {/* <Text
                                style={{
                                    fontSize: width / 22,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    fontWeight: "bold"
                                }}
                            >
                                JWT - Pakistan
                                {"\n"}
                                Creative Executive
                            </Text> */}

                            {
                                (this.state.status === 'yes') ?
                                    this.state.total_experience.slice(0).reverse().map((value, id) => {
                                        return <View key={id}>
                                            <Text

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

                                                style={{
                                                    fontSize: width / 22,
                                                    paddingTop: 0,
                                                    paddingBottom: 10,
                                                    fontWeight: "normal"
                                                }}>{value.Experience}</Text>
                                        </View>


                                    })
                                    : <View>
                                        <Text

                                            style={{
                                                fontSize: width / 22,
                                                paddingTop: 5,
                                                paddingBottom: 10,
                                                fontWeight: "bold"
                                            }}
                                        >

                                        </Text>

                                    </View>


                            }
                            {/* <Text>-----------------------------------------------------</Text> */}
                            {/* <Text
                                style={{
                                    fontSize: width / 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    color: "#0033a0"
                                }}
                            >
                                Add Work Expirence
    
    
                            </Text> */}
                        </ScrollView>
                    </View>
                </View>
            </View>
            // </ScrollView>
        );
    }
}



function mapStateToProps(state) {
    // console.log(state.authReducer.FriendReqUser, ";;")
    return {
        userID: state.authReducer.userID,
        phoneNumber: state.authReducer.phoneNumber,
        FriendReqUser: state.authReducer.FriendReqUser

    }
}
function mapDispatchToProps(dispatch) {
    return {


        sendFriendRequestAction: (payload, CurrUser, friendUid) => {
            dispatch(friendRequestAction(payload, CurrUser, friendUid));
        },
        GETUSERRequest: (payload) => {
            dispatch(FriendRequestList(payload));
        },
        Accept_Request_Action: (payload, Current_User_Detail, CurrUser, friendUid) => {
            dispatch(acceptRequestAction(payload, Current_User_Detail, CurrUser, friendUid));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileDetail);
