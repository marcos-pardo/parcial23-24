import mongoose from "npm:mongoose@7.6.3";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const PersonaSchema = new Schema(
  {
    dni: { type: String, required: true },
    nombre:{ type: String, required: true },
    email: { type: String, required: true},
    CodigoPostal: { type: Number, required: true },
    ISO: { type: String, required: true },
  },
  { timestamps: true }
);

export type PersonaModelType = mongoose.Document & Omit<Persona, "id">;

export default mongoose.model<PersonaModelType>("Persona", PersonaSchema);