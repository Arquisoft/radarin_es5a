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
import { getDistance } from 'geolib';

function Map( props ) {
  const { latitude, longitude } = usePosition( false );
//  const users = getUsers();
  const users = [
    {"name":"marcos", "ubicacion":{"lat": 43.5306455, "lng": -5.6563222 }}, 
    {"name":"german", "ubicacion":{"lat": 43.5276455, "lng": -5.6543222 }}, 
    {"name":"laura", "ubicacion":{"lat": 43.5263455, "lng": -5.6583222 }}
    ];
//  const radius = getRadius();
  const myAreaRadius = 500;
    
  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isOpen: -1,
    }), {
      onToggleOpen: ({  }) => key => ({
        isOpen: key,
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
        <Circle options={{fillOpacity:0.1, fillColor:"blue", strokeOpacity:0}} center={{ lat: latitude, lng: longitude }} radius={myAreaRadius}/>
        
        <Marker position={{ lat: latitude, lng: longitude }}/>

        {users.filter(user => getDistance(user.ubicacion, { latitude: latitude, longitude: longitude }) < myAreaRadius)
        .map((user, i) => (
        <Marker
        key={i}
        position={{ lat: user.ubicacion.lat, lng: user.ubicacion.lng }}
        onClick={() => props.onToggleOpen(i)}
      >
        {props.isOpen ===i && <InfoWindow onCloseClick={props.onToggleOpen}><div><h5>{user.name}</h5><a href="/chat">Chat</a></div></InfoWindow>}
      </Marker>
        ))}

    </GoogleMap>
  ));
  
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <MyMapComponent/>
    </div>
  );
      }

export default Map;
