import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";

const center = { lat: 50.450001, lng: 30.523333 };

const Map = (props) => {
  const { waypoints, setWaypoints } = props;
  const [infoWindowID, setInfoWindowID] = useState("");

  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const markerRef = useRef(null);

  function onMarkerLoad(marker) {
    markerRef.current = marker;
    console.log("MARKER LOAD", marker);
  }

  const onDragEnd = (id) =>
    function () {
      const lat = this.position.lat();
      const lng = this.position.lng();

      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { location: { lat: lat, lng: lng } },
        function (results, status) {
          // eslint-disable-next-line no-undef
          if (status === google.maps.GeocoderStatus.OK) {
            const updatedWaypoint = {
              id: id,
              address: results[0].formatted_address,
              location: {
                lng: lng,
                lat: lat,
              },
            };
            setWaypoints(
              waypoints.map((waypoint) => {
                if (waypoint.id === updatedWaypoint.id) {
                  return updatedWaypoint;
                } else {
                  return waypoint;
                }
              })
            );
          }
        }
      );
    };

  return (
    <>
      <GoogleMap
        center={
          (waypoints.length && waypoints[waypoints.length - 1].location) ||
          center
        }
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {waypoints.map((waypoint) => {
          return (
            <Marker
              onDragEnd={onDragEnd(waypoint.id)}
              onLoad={onMarkerLoad}
              key={waypoint.id}
              draggable
              position={waypoint.location}
              onClick={() => {
                setInfoWindowID(waypoint.id);
              }}
            >
              {infoWindowID === waypoint.id && (
                <InfoWindow>
                  <h1>{waypoint.address}</h1>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
        <Polyline
          options={polylineOptions}
          path={waypoints.map((waypoint) => waypoint.location)}
        />
      </GoogleMap>
    </>
  );
};

export default React.memo(Map);
