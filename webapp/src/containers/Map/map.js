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
//import { getDistance } from 'geolib';
import { getUsers } from "../../api/api";
import { updateUbicacion } from "../../api/api";
import { useWebId } from '@inrupt/solid-react-components';

function Map(props) {
  var { latitude, longitude } = usePosition(false);
  //  const users = getUsers();
  var users = [];
  var webId = useWebId();
  var strWebId = String(webId);
  //var webId2 = webId.replace('https://', '');
  //var res = webId.replace('https://', "red");
  //  const radius = getRadius();
  const myAreaRadius = 500;

  function actualizar() {
    getUsers().then((usuarios) => {
      console.log(usuarios[0]);
      users = [];
      Object.entries(usuarios[0]).forEach(([key, value]) => {
        var user = { "name": key, "ubicacion": { "lat": value.lat, "lng": value.lng } }
        var weid = strWebId.replace('https://', '');
        var weid2 = weid.replace('.', '_');
        var weid3 = weid2.replace('.', '_');
        var weid4 = weid3.split('/')[0];


        console.log("webId: " + weid4);
        if ("uo258472_inrupt_net" !== key) {
          users.push(user);
        } else {
          updateUbicacion(key,latitude,longitude);
        }

      })
      console.log(users);

    });


  }

  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isOpen: "",
      refreshingProperty: true,
    }), {
      // eslint-disable-next-line
      onToggleOpen: ({ }) => key => ({
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
      componentDidMount() {
        setInterval(() => {
          actualizar();
          this.setState({ refreshingProperty: false });
        }, 3000)

      }
    })
  )(props => (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: latitude, lng: longitude }}>
      <Circle options={{ fillOpacity: 0.1, fillColor: "blue", strokeOpacity: 0 }} center={{ lat: latitude, lng: longitude }} radius={myAreaRadius} />

      <Marker position={{ lat: latitude, lng: longitude }} />

      {/* .filter(user => getDistance(user.ubicacion, { latitude: latitude, longitude: longitude }) < myAreaRadius) */}

      {users
        .map((user) => (
          <Marker
            key={user.name}
            position={{ lat: user.ubicacion.lat, lng: user.ubicacion.lng }}
            onClick={() => props.onToggleOpen(user.name)}
          >
            {props.isOpen === user.name && <InfoWindow onCloseClick={props.onToggleOpen}><div><h5>{user.name}</h5><a href="/chat">Chat</a></div></InfoWindow>}
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