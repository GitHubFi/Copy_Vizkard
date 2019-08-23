import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import { profileAction } from '../../Store/Actions/AppAction'



class Edit_Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // experience: '',
            // company_name: '',
            submit: false,
            skill_name: '',
            Experience_name: '',
            delete: false


        }

    }

    componentWillMount() {
        const id = this.props.userID.uid
        this.props.profileData(id);
    }




    submit = () => {
        const { skill_name, Experience_name } = this.state;
        // const Experience = this.state.Experience_name
        const userID = this.props.userID.uid;
        const editExp = this.props.name;
        const Experience = this.props.Experience


        if (skill_name !== null) {


            firebase.database().ref(`users/${userID}`).child(`Experience`).child(editExp).update({

                Company: skill_name,
                Experience: Experience



            }).then(() => {
                this.setState({
                    skill_name: '',
                    submit: true,
                    editExp: ''
                });

                setTimeout(() => {

                    Alert.alert('', "your skill has been successfully changed");
                    this.setState({
                        submit: false
                    })
                }, 3000);
            }).catch((err) => {
                Alert.alert("", err);
            });

        }
        else {

        }



    }

    delete_Experience = () => {

        const userID = this.props.userID.uid;
        const editExp = this.props.name;


        Alert.alert(
            `Are you sure delete ?`,
            '',
            [
                ,
                {
                    text: 'Cancel',
                    onPress: () => {

                    }
                    ,
                    style: 'cancel',
                },
                {
                    text: 'Confirm ',
                    onPress: () => {
                        let delteRef = firebase.database().ref(`users/${userID}`).child(`Experience/${editExp}`)
                        delteRef.remove()
                            .then(() => {
                                this.setState({

                                    delete: true
                                });


                                setTimeout(() => {

                                    Alert.alert('', "your skill has been successfully changed");
                                    this.setState({
                                        delete: false
                                    });

                                }, 3000);
                            }).catch((err) => {
                                Alert.alert("", err);
                            });

                    }
                }
            ],
            { cancelable: false },
        );

    }

    render() {
        // console.log("waaaa", this.state.keyss)

        return (
            <View
                style={{ flex: 0.3, marginTop: 50, justifyContent: "center", textAlign: "center", padding: 10, margin: 20 }}>

                {
                    (this.state.delete === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block danger style={{ padding: 10 }}
                    onPress={this.delete_Experience}>
                    <Text>Remove Experience</Text>
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.flatten({});
function mapStateToProps(state) {
    return {
        verifyCode: state.authReducer.currentUser,
        phoneNumber: state.authReducer.phoneNumber,


        userID: state.authReducer.userID,

        isProgress: state.authReducer.isProgress,

        isError: state.authReducer.isError,

        errorTest: state.authReducer.errorTest,


    }
}
function mapDispatchToProps(dispatch) {
    return {
        verifyCode: (payload, path) => {
            dispatch(verifylogin(payload, path));
        },
        profileData: (userID) => {
            dispatch(profileAction(userID));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Experience);