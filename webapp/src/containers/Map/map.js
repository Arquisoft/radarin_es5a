/* import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';

import solid from '@solid/query-ldflex';

import { useWebId, List } from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 
import { addUbicacion } from './../../api/api'


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
  

  

  const actualizar = () => {
    console.log(latitude);
    console.log(longitude);
    console.log(webID);
    console.log("webID");
  };

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
      <button name="button" onClick={actualizar}>Click me</button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY" }}
        center={ { lat: latitude, lng: longitude } }
        defaultZoom={ 15 }>
<<<<<<< HEAD:webapp/src/containers/Map/map.js
          
          { /* Recorrer lista de amigos  }
=======

          { /* Recorrer lista de amigos */ }
>>>>>>> featureGerman:webapp/src/containers/Map/map.jsx
          <Marker lat={ latitude } lng={ longitude } color="red" text="Tú"/>
          <Marker lat={ latitude } lng={ longitude }/>

          <Marker lat={ 43.2632562745774 } lng={ -5.568455427747742 } color="blue" text="1" />
          <Marker lat={ 43.2457244275775 } lng={ -5.559724774574224 } color="blue" text="2" />
          <Marker lat={ 43.2575454547557 } lng={ -5.569989587494988 } color="blue" text="3" />

      </GoogleMapReact>
    </div>
  );
}

<<<<<<< HEAD:webapp/src/containers/Map/map.js
export default Map; */

import React from "react";
import { compose, withProps,withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker,
  InfoWindow
} from "react-google-maps";
import { usePosition } from 'use-position';

function Map( props ) {
  const { latitude, longitude } = usePosition( false );
    
  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: latitude, lng: longitude }}>
        <Circle options={{fillOpacity:0.1, fillColor:"blue", strokeOpacity:0}} center={{ lat: latitude, lng: longitude }} radius={500}/>
        
        <Marker position={{ lat: latitude, lng: longitude }}/>

        <Marker
          position={{ lat: latitude+0.004, lng: longitude }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}><a href="/chat">Chat</a></InfoWindow>}
        </Marker>

        <Marker
          position={{ lat: latitude+0.001, lng: longitude-0.002 }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}><a href="/chat">Chat</a></InfoWindow>}
        </Marker>

        <Marker
          position={{ lat: latitude-0.003, lng: longitude+0.002 }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}><a href="/chat">Chat</a></InfoWindow>}
        </Marker> 
    </GoogleMap>
  ));
  
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <MyMapComponent/>
    </div>
  );
      }

export default Map;
=======

export default Map;
>>>>>>> featureGerman:webapp/src/containers/Map/map.jsx
