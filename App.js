import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { createTable } from "./util/database";
import PlacesDetails from "./screens/PlacesDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    async function dbInit() {
      await SplashScreen.preventAutoHideAsync();
      await createTable();
      setDbInit(true);
    }
    dbInit();
  }, []);
  useEffect(() => {
    if (dbInit) {
      SplashScreen.hideAsync();
    }
  }, [dbInit]);
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary500 },
            headerTintColor: colors.gray700,
            contentStyle: { backgroundColor: colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  size={24}
                  icon="add"
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen name="PlaceDetails" component={PlacesDetails} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
