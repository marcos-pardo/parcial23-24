import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const getPersonas = async (req: Request, res: Response) => {
    try {
        const todasPersonas = await PersonaModel.find().exec();
        if (!todasPersonas) {
          res.status(404).send("Ninguna persona encontrada");
          return;
        }
        res.status(200).send({
            contactos: todasPersonas.map((persona) => ({
                dni: persona.dni,
                nombre: persona.nombre,
            })),
        });
      } catch (error) {
        res.status(404).send(error.message);
        return;
      }
};

export default getPersonas;