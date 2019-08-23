import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";

class Add_Expreience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: '',
            company_name: '',
            submit: false,

        }
    }

    submit = () => {
        const { experience, company_name } = this.state;
        const userID = this.props.userID.uid
        if (experience === '') {
            Alert.alert("", 'Add your experience');
        } else if (company_name === '') {
            Alert.alert("", 'Add your Company name');

        } else {
            // let msgId = firebase
            //     .database()
            //     .ref(`users/${userID}`)
            //     .child('Experience')
            //     .push().key;


            // let updates = {};
            // let message = {
            //     Company: company_name,
            //     Experience: experience

            // };

            // updates[
            //     `users/${userID}/Experience/${msgId}`
            // ] = message;

            // firebase.database().ref().update(updates)

            firebase.database().ref(`users/${userID}`).child('Experience').child(company_name).set({
                Company: company_name,
                Experience: experience
            }).then(() => {
                this.setState({
                    experience: '',
                    company_name: '',
                    submit: true
                });

                setTimeout(() => {

                    Alert.alert('', "your experience has been successfully submitted");
                    this.setState({
                        submit: false
                    })
                }, 3000);
            }).catch((err) => {
                Alert.alert("", err);
            });
        }
    }
    render() {
        // console.log("waaaa", this.state.total_experience)
        return (
            <View
                style={{ flex: 0.3, marginTop: 50, justifyContent: "center", textAlign: "center", padding: 10, margin: 20 }}>
                <View style={{ paddingBottom: 20 }}>
                    <Item floatingLabel>
                        <Label>Company Name</Label>
                        <Input
                            onChangeText={company_name => this.setState({ company_name })}
                            value={this.state.company_name} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Add Experience</Label>
                        <Input
                            onChangeText={experience => this.setState({ experience })}
                            value={this.state.experience} />
                    </Item>



                </View>
                {
                    (this.state.submit === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit}>
                    <Text>submit</Text>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_Expreience);