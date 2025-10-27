import React from "react";
import TripCard from "../molecules/TripCard";

const TripList = ({ trips }) => {
  return (
    <>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </>
  );
};

export default TripList;
