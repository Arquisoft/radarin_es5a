/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState }  from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
const { Session } = require("@inrupt/solid-client-authn-node");

// 1. Get the authenticated credentials: myClientId, myClientSecret, myRefreshToken 
// ...
// ...
// Important: Safeguard these credentials.
const session = new Session();
session.login({
  // 2. Use the authenticated credentials to log in the session.
  clientId: "miIdt",
  clientSecret: "miContraseña",
  refreshToken: "",
  // Set oidcIssuer to the Solid Identity Provider associated with the credentials.
  oidcIssuer: "https://solid.inrupt.com/get-a-solid-pod",
}).then(() => {
  if (session.info.isLoggedIn) {
    // 3. Your session should now be logged in, and able to make authenticated requests.
    session
      // You can change the fetched URL to a private resource, such as your Pod root.
      .fetch(session.info.webId)
      .then((response) => {
        return response.text();
      })
      .then(console.log);
  }
});
const App= ()  => {
  const [myText, setMyText] = useState("My Original Text");
  return(
    
    <View style ={{flex:1,alinItems:'center',justifyContent:'center'}}>
       <Text onPress = {() => setMyText("hola")}>
                    {myText}
            </Text>
    </View>
  );
}
export default App;
