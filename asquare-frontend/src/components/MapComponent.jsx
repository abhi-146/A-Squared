import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pointer from "../assets/3d-house.png";
import "./MapComponent.css";

const customIcon = new L.Icon({
  iconUrl: pointer,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapComponent = ({ location, community, lat, lon }) => {
  const [coordinates, setCoordinates] = useState(
    lat && lon ? [parseFloat(lat), parseFloat(lon)] : null
  );

  useEffect(() => {
    if (!lat || !lon) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: community,
                format: "json",
                limit: 1,
              },
            }
          );
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error("No coordinates found for the given community.");
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };

      fetchCoordinates();
    }
  }, [community, lat, lon]);

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customIcon}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
