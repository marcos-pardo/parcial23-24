import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const addPersona = async (req: Request, res: Response) => {
  try {
    const { dni, nombre, email , CodigoPostal , ISO } = req.body;
    if (!dni || !nombre ||!email || !CodigoPostal || !ISO) {
      res.status(500).send("Faltan alguno de estos : dni, nombre, email, CodigoPostal, ISO");
      return;
    }
    const alreadyExists = await PersonaModel.findOne({ dni }).exec();
    if (alreadyExists) {
      res.status(400).send("Ya hay alguien con este dni");
      return;
    }


    const newPersona = new PersonaModel({ dni, nombre, email , CodigoPostal , ISO  });
    await newPersona.save();

    res.status(200).send({
        dni:newPersona.dni,
        nombre:newPersona.nombre,
        email:newPersona.email,
        CodigoPostal: newPersona.CodigoPostal.toString(),
        ISO: newPersona.ISO,
        id: newPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPersona;
