import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const updatePersona = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const { nombre, email , CodigoPostal , ISO } = req.body;

    const updatedPersona = await PersonaModel.findOneAndUpdate(
      { dni },
      { nombre, email, CodigoPostal, ISO },
      { new: true }
    ).exec();

    if (!updatedPersona) {
      res.status(404).send("Persona no encontrada");
      return;
    }

    res.status(200).send({
        nombre: updatedPersona.nombre,
        email: updatedPersona.email,
        ISO: updatedPersona.ISO,
        CodigoPostal: updatedPersona.CodigoPostal.toString(),
        id: updatedPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatePersona;