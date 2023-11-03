import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";


const deletePersona = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const persona = await PersonaModel.findOneAndDelete({ dni }).exec();
    if (!persona) {
      res.status(404).send("Persona no encontrada");
      return;
    }
    res.status(200).send("Persona eliminada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePersona;