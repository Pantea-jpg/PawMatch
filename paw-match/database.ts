import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Pet } from "./types";
dotenv.config();

const client = new MongoClient(process.env.URL!, {
  family: 4,
});

export const collection: Collection<Pet> = client
  .db("pawMatch")
  .collection<Pet>("pets");

export function getPets() {
  return collection.find({}).toArray();
}

async function exit() {
  try {
    await client.close();
    console.log("Database closed");
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
}

export async function connect() {
  try {
    await client.connect();
    await seed();
    console.log("Database connected!");
    process.on("SIGINT", exit);
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

async function seed() {
  if ((await collection.countDocuments()) !== 0) {
    return;
  }
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Pantea-jpg/jsonFiles/main/pets.json",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch pets: ${response.status}`);
    }
    const data: Pet[] = await response.json();
    await collection.insertMany(data);
    console.log(`Data was inserted successfully!`);
  } catch (error) {
    console.error(error);
  }
}
