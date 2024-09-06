import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

export const createTable = async () => {
  const database = await SQLite.openDatabaseAsync("places.db");

  const result = await database.execAsync(
    `
    CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )
    `
  );

  return result;
};

export async function insertPlace(place) {
  try {
    const database = await SQLite.openDatabaseAsync("places.db");

    let result = await database.runAsync(
      `
        INSERT INTO places (title, imageUri, address, lat, lng) 
        VALUES (?, ?, ?, ?, ?)
    `,

      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchPlaces() {
  const database = await SQLite.openDatabaseAsync("places.db");
  const allRows = await database.getAllAsync("SELECT * FROM places");
  return allRows.map(
    (el) =>
      new Place(
        el.title,
        el.imageUri,
        {
          address: el.address,
          lat: el.lat,
          lng: el.lng,
        },
        el.id
      )
  );
}

export async function fetchPlaceDetails(id) {
  const database = await SQLite.openDatabaseAsync("places.db");
  const data = database.getFirstAsync("SELECT * FROM places WHERE id = ?", id);
  return data;
}
