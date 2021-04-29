import React from "react";
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
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
  var { latitude, longitude } = usePosition( false );
//  const users = getUsers();
  var users = [
    {"name":"marcos", "ubicacion":{"lat": latitude + 0.004, "lng": longitude}}, 
    {"name":"german", "ubicacion":{"lat": latitude + 0.001, "lng": longitude + 0.004 }}, 
    {"name":"laura", "ubicacion":{"lat": latitude - 0.0005, "lng": longitude - 0.002 }}
    ];
//  const radius = getRadius();
  const myAreaRadius = 500;

function actualizar(){
  longitude = longitude + 0.0002;
}
    
  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isOpen: "",
      refreshingProperty: true,
    }), {
      // eslint-disable-next-line
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
    withGoogleMap,
    lifecycle({
      componentDidMount(){
        setInterval( () => {
        actualizar();
        this.setState({refreshingProperty: false});
      },500)
        
      }
    })
  )(props => (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: latitude, lng: longitude }}>
        <Circle options={{fillOpacity:0.1, fillColor:"blue", strokeOpacity:0}} center={{ lat: latitude, lng: longitude }} radius={myAreaRadius}/>
        
        <Marker position={{ lat: latitude, lng: longitude }}/>

        {users.filter(user => getDistance(user.ubicacion, { latitude: latitude, longitude: longitude }) < myAreaRadius)
        .map((user) => (
        <Marker
        key={user.name}
        position={{ lat: user.ubicacion.lat, lng: user.ubicacion.lng }}
        onClick={() => props.onToggleOpen(user.name)}
      >
        {props.isOpen ===user.name && <InfoWindow onCloseClick={props.onToggleOpen}><div><h5>{user.name}</h5><a href="/chat">Chat</a></div></InfoWindow>}
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
