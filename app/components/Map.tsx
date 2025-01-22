'use client'

import React from "react";
import Map, { Marker } from "react-map-gl";

const MyMap = () => {
  return (
    <Map
      initialViewState={{
        latitude: 37.7749, // Example coordinates (San Francisco)
        longitude: 77.4194,
        zoom: 10,
      }}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="EQdvPuB3WHluz1ReXGNY"
    >
      <Marker longitude={77.4194} latitude={37.7749} color="red" />
    </Map>
  );
};

export default MyMap;
