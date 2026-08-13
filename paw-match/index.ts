import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connect, collection, getPets } from "./database";
dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/", async (req, res) => {
  const pets = await getPets();
  res.render("index", {
    pets,
  });
});


app.get("/:pet", async (req, res) => {
  const petName = typeof req.params.pet === "string" ? req.params.pet : "";
  const pet = await collection.findOne({ name: petName });
  res.render("detail", {
    pet,
  });
});

app.listen(app.get("port"), async () => {
  try {
    await connect();
    console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
