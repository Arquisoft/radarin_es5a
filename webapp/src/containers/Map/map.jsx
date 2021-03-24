import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { usePosition } from 'use-position';

import solid from '@solid/query-ldflex';

import { useWebId, List } from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 

import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { firebaseConfig } from "../../firebaseConfig";
import * as firebase from 'firebase/app';



//import './Map.css'


const Marker = (props) => (
  <div style={{
    color: 'white', 
    background: props.color,
    padding: '15px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {props.text}
  </div>
);

async function getUserWebID () {
  const user = solid.data.user;
  const webID = await user;
  return webID;
}

async function getFriends( friends ) {
  const friendsValue = await friends;
  return friendsValue;
}

// Use React.Memo
function Map( props ) {
  const [userFriendsList, setUserFriendsList] = useState( [] );
  const [serverResponse, setServerResponse] = useState( {} );
  const [userWebID, setUserWebID] = useState( useWebId() );

  const tempFriendsList = [];
  const webID = useWebId();

  const { latitude, longitude } = usePosition( false );

  getFriends(useLDflexList( "[" + webID + "].friends" ))
      .then( (friendsList) => { setUserFriendsList( friendsList ) });

  useEffect( () => {
    userFriendsList.forEach(element => tempFriendsList.push( element.valueOf() ) );

    let userInfo = { 
      "webid": webID,
      "data": {
        "friends": tempFriendsList, 
        "last_location": {
          "lat": latitude, 
          "lon": longitude, 
          "timestamp": Date.now() 
        }
      }
    }

    if (tempFriendsList.length > 0 ){
      axios.post( 'https://a661ffc8a0b6903e4b6821c7ec99ac9d.m.pipedream.net', userInfo )
          .then(res => { console.log("Request complete! response:", res.data ) });
    }
  }, [userFriendsList] );

  return (
    <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
          <div>
            <FirebaseDatabaseNode
              path="user_bookmarks/"
              limitToFirst={this.state.limit}
              // orderByKey
              orderByValue={"created_on"}
            >
              {d => {
                return (
                  <React.Fragment>
                    <pre>Path {d.path}</pre>
                    <pre style={{ height: 300, overflow: "auto" }}>
                      Value {s(d.value)}
                    </pre>
                    <button
                      onClick={() => {
                        this.setState(state => ({ limit: state.limit + 2 }));
                      }}
                    >
                      Load more
                    </button>
                  </React.Fragment>
                );
              }}
            </FirebaseDatabaseNode>
          </div>
        </FirebaseDatabaseProvider>
  );
}

export default Map;