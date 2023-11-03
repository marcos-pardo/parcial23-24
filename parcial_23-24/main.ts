import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addPersona from "./resolvers/addPersona.ts";
import getPersona from "./resolvers/getPersona.ts";
import getPersonas from "./resolvers/getPersonas.ts";
import updatePersona from "./resolvers/updatePersona.ts";
import deletePersona from "./resolvers/deletePersona.ts";


import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("Debes especificar la variable de entorno MONGO_URL");
  Deno.exit(1);
}



try {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado a la base de datos");
  const app = express();
app.use(express.json());
app
.post("/api/contactos", addPersona)
.get("/api/contactos/:dni", getPersona)
.get("/api/contactos", getPersonas)
.put("/api/contactos/:dni", updatePersona)
.delete("/api/contactos/:dni", deletePersona)


app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
  

}
catch (error) {
  console.log(error);
}