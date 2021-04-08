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
