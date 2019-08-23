// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// export default class Notification extends Component {

//     // static navigationOptions = {
//     //     drawerIcon: ({ tintColor }) => (
//     //         <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce' }}

//     //         />
//     //     ),


//     // }
//     static navigationOptions = {
//         drawerLabel: 'Notification',
//         drawerIcon: ({ tintColor }) => (
//             <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce' }}

//             />
//         ),
//     };


//     render() {
//         return (
//             <View style={{
//                 flex: 1, justifyContent: "center",
//                 textAlign: "center",
//                 alignContent: "center",
//                 backgroundColor: "white",
//             }}>
//                 <Text style={{
//                     textAlign: "center",

//                 }}>
//                     Notification</Text>
//             </View>
//         )
//     }
// }

import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, Image } from 'react-native';
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
import { Card, CardItem, Body, Icon } from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NotificationAction } from '../../Store/Actions/AppAction';

class Notification extends Component {
    static navigationOptions = {
        headerTitle: 'Notification',
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce', }}

            />
        ),
        headerStyle: {
            backgroundColor: "#0071CE"
          },
          headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: -10
        }
        // headerTitle:"Notification"
    };


    componentWillMount() {
        // this.props.GetAllNotification();
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    // height: height,
                    width,
                    backgroundColor: "#eee"
                }}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1, backgroundColor: "#eee" }}>

                    <Card style={{ flex: 0.3, }}>

                        {/* {
                            this.props.Notification !== null ?
                                this.props.Notification.map((data, index) => */}
                        <View>


                            <CardItem header
                            //  key={index} 
                             bordered style={{ flex: 0.1, backgroundColor: '#0071CE' }}>
                                <MaterialCommunityIcons name="flash" size={25} color="#fff" />

                                <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff" }}>
                                    {/* {data.Notification1} */}
                                    Notification
                                </Text>
                            </CardItem>
                            <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                                <Body>
                                    <Text style={{ fontSize: width / 24 }}>
                                        {/* {data.Notification2} */}
                                        Notification
                                                </Text>

                                </Body>
                            </CardItem>
                            <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                                <Body>
                                    <Text style={{ fontSize: width / 24 }}>
                                        Notification
                                                    {/* {data.Notification3} */}
                                    </Text>

                                </Body>
                            </CardItem>
                        </View>
                        {/* )
                                : null
                        } */}
                    </Card>



                    {/* <Card style={{ flex: 0.3, }}>

                        <CardItem header bordered style={{ flex: 0.1, backgroundColor: "#282828" }}>
                            <MaterialCommunityIcons name="gas-cylinder" size={25} color="#fff" />

                            <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff" }}>
                                Gas Notification
</Text>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24 }}>
                                    Gas Notification
</Text>

                            </Body>
                        </CardItem>


                    </Card>
                    <Card style={{ flex: 0.3, }}>

                        <CardItem header bordered style={{ flex: 0.1, backgroundColor: '#282828' }}>
                            <MaterialCommunityIcons name="water" size={25} color="#fff" />
                            <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff" }}>
                                Water Notification
</Text>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24 }}>
                                    Water Notification
</Text>

                            </Body>
                        </CardItem>


                    </Card> */}





                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.authReducer.UserList, "+++++++++++++++USERMERAJ++++++++++++++++")
    // console.log(state.authReducer.Notification, "+++++++++++++++CURRENT USER++++++++++++++++")
    return {
        // UserList: state.authReducer.UserList,
        // currentUser: state.authReducer.currentUser,
        // Notification: state.authReducer.Notification
    }
}
function mapDispatchToProps(dispatch) {
    return {

        GetAllNotification: () => {
            // dispatch(NotificationAction())

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)