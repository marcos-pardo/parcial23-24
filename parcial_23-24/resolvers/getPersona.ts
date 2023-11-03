import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";
import { Place, Temperatura } from "../types.ts";

const getPersona = async (req: Request, res: Response) => {
    try {
        const {dni } = req.params;


        const getPlace = async (CodigoPostal: number):Promise<Place> => {
            const BASE_URL = "http://postalcode.parseapi.com/api"
            const API_KEY= "eb1d7c58bdbf2bd803e5f5b35fb854b0"
        
            const url = `${BASE_URL}/${API_KEY}/${CodigoPostal}`;
        
            const data = await fetch(url);
            if(data.status !== 200) {
                throw new Error("Bad Request");
            }
            const json = await data.json();
            const city = json.city.name;
            const country = json.country.name;
        
            return{
                city,
                country,
            }
        
        }
        const getTemperatura = async (ciudad: string) => {
            const BASE_URL = "http://api.weatherapi.com/v1/current.json"
            const API_KEY = "8cfc595a154145fb912201320230510"
            const url = `${BASE_URL}?key=${API_KEY}&q=${ciudad}`;
        
            const data = await fetch(url);
            if(data.status !== 200) {
                throw new Error("Bad Request");
            }
            const json = await data.json();
            const temp_c = json.current.temp_c;
        
        
            return{
            temp_c,
            }
        
        }


    

        const persona = await PersonaModel.findOne({ dni }).exec();
        if (!persona) {
          res.status(404).send("Ninguna persona encontrada con ese dni");
          return;
        }
        const CodigoPostal = persona.CodigoPostal;
        const {city} = await getPlace(CodigoPostal);
        const {country} = await getPlace(CodigoPostal);
        res.status(200).send({
            dni:persona.dni,
            name:persona.nombre,
            email:persona.email,
            CodigoPostal: persona.CodigoPostal.toString(),
            Ciudad: city, 
            Pais: country,
            ISO: persona.ISO,
            id: persona._id.toString(),
        });
        } catch (error) {
        res.status(404).send(error.message);
        return;
        }
};

export default getPersona;
