import React from "react";
import { Text, View } from "react-native";
import PlacesForm from "../components/Places/PlacesForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  async function onCreatePlace(place) {
    let id = await insertPlace(place);
    if (id) {
      navigation.navigate("AllPlaces");
    }
  }

  return <PlacesForm onCreatePlace={onCreatePlace} />;
};

export default AddPlace;
