
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';

import { Input, Button, Spinner, Thumbnail, Header, Left, Body, Right, Title, Icon } from "native-base";
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
            // <ScrollView contentContainerStyle={{ height: height, width, backgroundColor: "#eeeeee" }} 
            // keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" >
            <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                <Header
                    style={{ backgroundColor: '#0071CE' }}
                    androidStatusBarColor="#0071CE">
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                            <Icon name="arrow-back" style={{ color: "#fff", marginLeft: 10 }} />
                        </TouchableOpacity>

                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title
                            style={{ alignSelf: "center" }}
                        // style={{ alignSelf: 'center', alignContent: "center", textAlign: 'center', justifyContent: 'center' }}
                        >Manage Account</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {/* <Icon name='menu' /> */}
                    </Right>

                </Header>
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
                <View style={{ flex:1, justifyContent: "center", alignItems: "center", textAlign: 'center', padding: 30,  }}>
                    <Text style={{ color: '#05527c', fontSize: width / 16, fontWeight: 'bold', paddingBottom: 15 }}>
                        Vizkard FAQ
                            </Text>

                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Is Vizkard a social platform?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            Yes, Vizkard is a professional social platform, aimed at connecting professionals across industries so they can connect on the basis of their skills, their specialization and their careers.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold' ,paddingBottom: 8}}>
                        Is Vizkard free to use for everyone?
                        </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        Yes, Vizkard is a free to use platform, with the ability to promote your profile, or your business via a paid feature.
                            </Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold',paddingBottom: 8 }}>
                        Has Vizkard been developed locally? (In Pakistan)
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        Yes, Vizkard is a pure local development project, headed by professionals working {'&'} living in Karachi.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold',paddingBottom: 8 }}>
                        Will Vizkard direct ads towards me?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        Yes, Vizkard aims to direct ads to you based on your interests - that too, in a non-intrusive manner.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold',paddingBottom: 8 }}>
                        Will Vizkard evolve and grow as a platform for professional?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" ,paddingBottom: 35}}>
                        Absolutely, we have long development roadmap planned for this product.
                            </Text>
                    </View>
                    <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" , fontStyle:'italic'}}>
                    For any further queries, feel free to get in touch via the 'Feedback' form in the app drawer menu.
                            </Text>


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
            // </ScrollView>
        )
    }
}