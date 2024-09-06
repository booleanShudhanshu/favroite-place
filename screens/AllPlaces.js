import React, { useEffect, useState } from "react";
import PlaceList from "../components/Places/PlaceList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({}) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces} />;
};

export default AllPlaces;
