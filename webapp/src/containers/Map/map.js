import React, { useState } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
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
import { getUsers } from './../../api/api'


function Map(props) {
  const { latitude, longitude } = usePosition(false);
  const [usersList, setUsersList] = useState([]);
  const [lista, setLista] = useState([]);
  var tiempoLoquisimo = 100000000000;
  var tiempo = 10000;

  
  console.log(props.usuarios)

  var promise1 = Promise.resolve(getUsers());
  promise1.then((usuarios) => {
    setUsersList(usuarios);
  });

  const users = [
    { "name": "marcos", "ubicacion": { "lat": 43.5306455, "lng": -5.6563222 } },
    { "name": "german", "ubicacion": { "lat": 43.5276455, "lng": -5.6543222 } },
    { "name": "laura", "ubicacion": { "lat": 43.5263455, "lng": -5.6583222 } }
  ];
  //  const radius = getRadius();
  const myAreaRadius = 500;

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
      <Circle options={{ fillOpacity: 0.1, fillColor: "blue", strokeOpacity: 0 }} center={{ lat: latitude, lng: longitude }} radius={myAreaRadius} />

      <Marker position={{ lat: latitude, lng: longitude }} />

      {/* .filter(user => getDistance(user[1], { latitude: latitude, longitude: longitude }) < myAreaRadius) */

      }

      {
        Object.entries(usersList).forEach(([key, value]) => {
          lista.push([key, value]);
        })

      }

      {lista
        .map(user => (
          <Marker
            position={{ lat: user[1].lat, lng: user[1].lng }}
            onClick={props.onToggleOpen}
          >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}><a href="/chat">{user[0]}</a></InfoWindow>}
          </Marker>
        ))}

    </GoogleMap>
  ));

  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <MyMapComponent />
    </div>
  );
}

export default Map;
