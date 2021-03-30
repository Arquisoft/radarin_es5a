import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { usePosition } from 'use-position';

import solid from '@solid/query-ldflex';

import { useWebId, List } from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 


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
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY" }}
        center={ { lat: latitude, lng: longitude } }
        defaultZoom={ 15 }>

          { /* Recorrer lista de amigos */ }
          <Marker lat={ latitude } lng={ longitude } color="red" text="Tú"/>

          <Marker lat={ 43.2632562745774 } lng={ -5.568455427747742 } color="blue" text="1" />
          <Marker lat={ 43.2457244275775 } lng={ -5.559724774574224 } color="blue" text="2" />
          <Marker lat={ 43.2575454547557 } lng={ -5.569989587494988 } color="blue" text="3" />

      </GoogleMapReact>
    </div>
  );
}


export default Map;