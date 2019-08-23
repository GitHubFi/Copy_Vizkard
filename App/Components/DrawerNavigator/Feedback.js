import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Image, Text, ToastAndroid, AsyncStorage } from "react-native";
const { width, height } = Dimensions.get("window");
import { Input, Textarea, Button, Form } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            contactNo: '',
            subject: '',
            description: ''


        }
    }


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="file-document-box" size={25} style={{ color: '#0071ce' }} />
        ),
        title: "Feedback",
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


    submit = async () => {
        const { name, email, contactNo, subject, description } = this.state;
        if (name === '') {
            ToastAndroid.show('Please Enter Your Name', ToastAndroid.SHORT);
            return
        } else if (email === '') {
            ToastAndroid.show('Please Enter Your Email Address', ToastAndroid.SHORT);
            return

        }
        else if (contactNo === '') {

            ToastAndroid.show('Please Enter Your Contact No', ToastAndroid.SHORT);
            return

        }
        else if (subject === '') {
            ToastAndroid.show('Please Enter Your Subject', ToastAndroid.SHORT);
            return

        }
        else if (description === '') {
            ToastAndroid.show('Please Enter Your Description', ToastAndroid.SHORT);
            return

        }
        let user = await AsyncStorage.getItem('User');
        // console.log(user, 'xxx')
        let contactProperties = {
            name,
            email,
            contactNo,
            subject,
            description,
            user
        }
        // this.props.contactComponent(contactProperties);
        // ToastAndroid.show('Thank You', ToastAndroid.SHORT);
        // this.props.navigation.navigate('dashBoard')
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    height: height,
                    width,
                    backgroundColor: "#eeeeee"
                }}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("../../../assets/logo.png")}
                            style={{
                                width: width / 2,
                                // height: height/2,
                                marginTop: 20,
                                resizeMode: "contain"
                                // color:'rgba(208, 164, 135, 1)'
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ textAlign: 'center',fontSize:16,fontWeight:"300" }}>
                            Your feedback is important to us and give us valuable {"\n"}
                            insight to continuously improve and serve you better. {"\n"}
                            For suggestions and feedback,fill the form below.
             </Text>
                    </View>
                    <View style={{ flex: 0.6, backgroundColor: '#eeeeee', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                placeholder={"Full Name"}
                                placeholder="Full Name"
                                style={{ color: "#24516e" }}
                                // keyboardType={"email-address"}
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
                                placeholder={"Your Email"}
                                autoCapitalize={"none"}
                                placeholder="Your Email"
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
                            <MaterialCommunityIcons name="phone" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Contact No"}
                                keyboardType={"number-pad"}
                                placeholder="Contact No"
                                style={{ color: "#24516e" }}
                                onChangeText={contactNo => this.setState({ contactNo })}
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
                            <MaterialCommunityIcons name="pencil" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Subject"}
                                placeholder="Subject"
                                style={{ color: "#24516e" }}
                                // secureTextEntry
                                onChangeText={subject => this.setState({ subject })}
                            />
                        </View>
                        {/* <View style={{marginRight:5}}> */}

                        <Textarea rowSpan={5} value={this.state.description} bordered placeholder="Your Message" onChangeText={description => this.setState({ description })} style={{ margin: width / 36, color: "#24516e", width:"95%", backgroundColor: "#fff" }} />

                        {/* </View> */}


                        <View
                            style={{
                                flex: 0.5,
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
                                    backgroundColor: "#0071CE",
                                    alignSelf: "center",
                                    // borderRadius: width / 12
                                }}
                                onPress={this.submit}
                            >
                                <Text style={{ color: "#fff" }}>SEND MESSAGE</Text>
                            </Button>
                        </View>
                    </View>
                    {/* <View style={{ flex: 0.4 }}>
            <Text>Get In Touch</Text>
          </View> */}
                </View>
            </ScrollView>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        // contactComponent: obj => dispatch(contactAction(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
{/* <MaterialCommunityIcons name={"account-badge"} size={25} style={{color:'#0071ce'}} /> */ }