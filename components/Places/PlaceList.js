import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlaceList = ({ places }) => {
  const naviagtion = useNavigation();
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackConatiner}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some
        </Text>
      </View>
    );
  }

  function selectPlaceHandler(id) {
    naviagtion.navigate("PlaceDetails", {
      placeId: id,
    });
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  fallbackConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: colors.primary200,
  },
  list: {
    margin: 24,
  },
});
