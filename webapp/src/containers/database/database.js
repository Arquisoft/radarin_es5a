import firebase from "firebase/app";
import "firebase/database";

var database = firebase.database();

// [START rtdb_write_new_user]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
// [END rtdb_write_new_user]