
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';
import { Input, Button, Spinner, Thumbnail } from "native-base";
const { height, width } = Dimensions.get('window');
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default class Help extends Component {
    static navigationOptions = {
        headerTitle: "Help",
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="alert-circle-outline" size={25} style={{ color: '#0071ce' }} />
        ),
        title: "Help ",
        headerStyle: {
            backgroundColor: "#8b6e4b"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: -10
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ height: height, width, backgroundColor: "#eeeeee" }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
                <View style={{ flex: 1, padding: width / 20, justifyContent: "space-around" }}>
                    {/* <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}> */}
                        {/* <View style={{ flex: 0.1 }}>

                        </View> */}
                        {/* <View style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }} > */}
                            {/* <View
                        style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    > */}
                            {/* <Image
                                source={require("../../../assets/logo.png")}
                                style={{
                                    width: width / 2,
                                    // height: height/2,
                                    marginTop: 20,
                                    resizeMode: "contain"
                                    // color:'rgba(208, 164, 135, 1)'
                                }}
                            /> */}
                            {/* </View> */}
                            {/* <Image source={require("../../../assets/logoB.png")} style={{ width: width / 2, marginTop: 20 }} resizeMode='contain' /> */}
                        {/* </View> */}
                        {/* <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}> */}
                            {/* <Thumbnail large source={require('../../../assets/profileImage.png')} /> */}
                        {/* </View> */}
                        <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: '#05527c', fontSize: width / 16 }}>
                            Vizkard FAQ
                            </Text>
                            <Text style={{ color: '#f09291',justifyContent: "center", alignItems: "center", textAlign:"center" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
                            

                        </View>
                    {/* </View> */}
                    {/* <View style={{ flex: 0.4, backgroundColor: '#eeeeee', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="account" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Username"}
                                placeholder="Username"
                                style={{ color: "#24516e" }}
                                keyboardType={"email-address"}
                                onChangeText={name => this.setState({ name })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="email" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Email"}
                                placeholder="Email"
                                style={{ color: "#24516e" }}
                                keyboardType={"email-address"}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="lock-question" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Password"}
                                placeholder="Password"
                                style={{ color: "#24516e" }}
                                onChangeText={password => this.setState({ password })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36

                            }}
                        >
                            <MaterialCommunityIcons name="lock-question" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Confirm Password"}
                                placeholder="Confirm Password"
                                style={{ color: "#24516e" }}
                                secureTextEntry
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                        >
                            <Button
                                style={{
                                    // marginTop: height / 10,
                                    height: width / 14,
                                    width: width * 0.9,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#24516e",
                                    alignSelf: "center",
                                    // borderRadius: width / 12
                                }}
                                onPress={this.signUp}
                            >
                                <Text style={{ color: "#fff" }}>Update Profile</Text>
                            </Button>
                        </View>
                    </View> */}


                </View>
            </ScrollView>
        )
    }
}