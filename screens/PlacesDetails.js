import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

const PlacesDetails = ({ navigation, route }) => {
  const selectedPlaceId = route.params.placeId;
  const [fetchedPlace, setFetchedPlace] = useState();

  useEffect(() => {
    async function loadPlaceData() {
      console.log(selectedPlaceId);
      const place = await fetchPlaceDetails(selectedPlaceId);
      console.log({ place });
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  function showOnMapHandler() {
    console.log(fetchedPlace);
    navigation.navigate("Map", {
      initialLat: fetchedPlace.lat,
      initialLng: fetchedPlace.lng,
    });
  }
  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlacesDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
