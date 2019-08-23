import ActionTypes from "../actionTypes";
import firebase from "react-native-firebase";


export function createProfileAction(payload) {
  return dispatch => {
    this.history = payload.history;
    return firebase.database().ref(`users/${payload.uid}`).child('userDetail').set(payload

      , (err) => {
        if (err) {
          // console.log(err)
          dispatch(createProfileError(err))
          // return AppAction.createProfileError(err)
        } else {
          // console.log("successfull")
          // return firebase.database().ref(`${payload.uid}`).once("value", snapShot => {
          // console.log(snapShot.val())
          dispatch(createProfileSuccess(payload))
          this.history.navigate('Login');
          // return AppAction.createProfileSuccess("Success")
          // })
        }
      });
  }
}
export function profileAction(userID) {
  return dispatch => {
    // console.log(userID, 'phonennnnn')
    dispatch(GetProfileProgress());

    firebase.database().ref(`users`).child(userID).on('child_added', snapshot => {
      let user = snapshot.val();
      // console.log(user, 'data')

      dispatch(GetProfileSuccess(user))
    })
  }
}
// export default class AppAction {
//   // create profile //
//   static createProfileProgress(obj) {
    // console.log(obj);
//     return {
//       type: ActionTypes.CREATE_PROFILE_PROGRESS,
//       payload: obj
//     };
//   }
//   static createProfileSuccess(obj) {
    // console.log(obj);
//     return {
//       type: ActionTypes.CREATE_PROFILE_SUCCESS,
//       payload: obj
//     };
//   }
//   static createProfileError(obj) {
//     return {
//       type: ActionTypes.CREATE_PRIFILE_ERROR,
//       payload: obj
//     };
//   }

//   // Get Profile //
//   static GetProfileProgress() {
    // console.log(obj);
//     return {
//       type: ActionTypes.GET_PROFILE_PROGRESS,
//       payload: "ammar"
//     };
//   }
//   static GetProfileSuccess(obj) {
//     console.log(obj);
//     return {
//       type: ActionTypes.GET_PROFILE_SUCCESS,
//       payload: obj
//     };
//   }
//   static GetProfileError(obj) {
//     return {
//       type: ActionTypes.GET_PROFILE_ERROR,
//       payload: obj
//     };
//   }
// }

function createProfileProgress() {
  return {
    type: ActionTypes.createProfileProgress
  }
}
function createProfileSuccess(obj) {
  return {
    type: ActionTypes.CREATE_PROFILE_SUCCESS,
    payload: obj
  }
}
function createProfileError(err) {
  return {
    type: ActionTypes.CREATE_PRIFILE_ERROR,
    payload: err
  }
}

function GetProfileProgress() {
  // console.log(obj);
  return {
    type: ActionTypes.GET_PROFILE_PROGRESS,
    // payload: "ammar"
  };
}
function GetProfileSuccess(obj) {
  // console.log(obj);
  return {
    type: ActionTypes.GET_PROFILE_SUCCESS,
    payload: obj
  };
}
function GetProfileError(obj) {
  return {
    type: ActionTypes.GET_PROFILE_ERROR,
    payload: obj
  };
}
















//////////////////////////////////////// chat /////////////////////////////////


export function UserList() {
  return dispatch => {

  }
}


/////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// Public Profile Page /////////////////////////////////////
export function getAllUser() {
  return dispatch => {
    firebase.database().ref('users').on('value', (snapshot) => {
      let userList = snapshot.val(),

        userListKeys = Object.keys(userList);
      console.log(userListKeys, "9999999999999999999999999999999999999999999999999999999999")
      let arrList = [];

      userListKeys.map(i => {
        if (userList[i]) {
          let obj = {
            // uid: userList[i].userAuth,
            address: userList[i].userDetail.address,
            city: userList[i].userDetail.city,
            company: userList[i].userDetail.company,
            country: userList[i].userDetail.country,
            email: userList[i].userDetail.email,
            name: userList[i].userDetail.name,
            occupation: userList[i].userDetail.occupation,
            phoneNumber: userList[i].userDetail.phoneNumber,
            website: userList[i].userDetail.website,
            uid: userList[i].userDetail.uid,
            // friend_list: userList[i].FriendList,

          }
          arrList.push(obj)
        }
      });


      // console.log(arrList, 'userList')
      dispatch(publicProfileSuccess(arrList))
    })
  }
}


function publicProfileSuccess(data) {
  return {
    type: ActionTypes.GET_ALL_USER_PUBLIC_SUCCESS,
    payload: data
  }
}

export function friendRequestAction(payload, CurrUser, friendUid) {
  return dispatch => {

    // firebase
    //   .database()
    //   .ref(`users/${CurrUser}`).child(`FriendList/${friendUid}`)
    //   .set(payload).then(()=>{

    //   })

    let msgId = firebase
      .database()
      .ref("Friend Request")
      .child(CurrUser)
      .child(friendUid)
      .push().key;

    // console.log(msgId)

    let updates = {};

    let Friend_Request = {
      // message: this.state.textMessage,
      // time: firebase.database.ServerValue.TIMESTAMP,
      to: friendUid,
      from: CurrUser,
      status: "send request"
    };
    let Friend_Accept = {
      // message: this.state.textMessage,
      // time: firebase.database.ServerValue.TIMESTAMP,
      to: CurrUser,
      from: friendUid,
      status: "accept request"
    };
    updates[
      `Friend Request/${CurrUser}/${friendUid}/${msgId}`
    ] = Friend_Request;
    updates[
      `Friend Request/${friendUid}/${CurrUser}/${msgId}`
    ] = Friend_Accept;

    firebase
      .database()
      .ref()
      .update(updates);

  }
}

export function acceptRequestAction(payload, Current_User_Detail, CurrUser, friendUid) {
  return dispatch => {

    //accept request 
    //accept request
    firebase
      .database()
      .ref(`users/${CurrUser}`).child(`FriendList/${friendUid}`)
      .set(payload);

    firebase
      .database()
      .ref(`users/${friendUid}`).child(`FriendList/${CurrUser}`)
      .set(Current_User_Detail);
    //accept request
    //accept request



    // let updates = {};
    // let msgId = firebase
    //   .database()
    //   .ref("Friend Request")
    //   .child(CurrUser)
    //   .child(friendUid)
    //   .push().key;


    // const BothAreFriend = "yes"

    firebase.database().ref(`Friend Request/${CurrUser}/${friendUid}/`).update({
      BothAreFriend: "yes"
    });
    firebase.database().ref(`Friend Request/${friendUid}/${CurrUser}/`).update({
      BothAreFriend: "yes"
    });

    // updates[
    //   `Friend Request/${CurrUser}/${friendUid}/${msgId}`
    // ] = Friends;
    // updates[
    //   `Friend Request/${friendUid}/${CurrUser}/${msgId}`
    // ] = Friends;

    // firebase
    //   .database()
    //   .ref()
    //   .update(updates);
  }
}

export function FriendRequestList(payload) {
  // console.log(payload, "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");

  return dispatch => {
    dispatch(GetRequestUser(payload));

  }
}


function GetRequestUser(payload) {
  return {
    type: ActionTypes.Get_USER_REQ,
    payload: payload
  }
}

export function All_Message_Action(array) {
  return dispatch => {

    dispatch(Get_All_Messsage(array))
  }
}

function Get_All_Messsage(array) {
  return {
    type: ActionTypes.GET_ALL_MESSAGES,
    payload: array
  }
}


export function GetUserAction(userID) {
  return dispatch => {
    // console.log(userID, 'phonennnnn')
    dispatch(GetProfileProgress());

    firebase.database().ref(`users`).child(userID).child('Experience').on('child_added', snapshot => {
      let user = snapshot.val();
      // let array = []
      // array.push(user)


      dispatch(GetExperience(user))
    })
  }
}


function GetExperience(array) {
  // console.log(array);
  return {
    type: ActionTypes.GET_Experience_SUCCESS,
    payload: array
  };
}