import { validate } from "class-validator";
import { Ad } from "../entities/ad.entity";

export default class AdService {
    constructor() {

    }
    static async list() {

        console.log("Je suis dans ma méthode List de Ad")
        const ads = await Ad.find({
            relations: {
                category: true,
                tags: true,
            },
        });

        return ads;
    }
    static async create() {
       /*  console.log("Je suis dans ma méthode Create de Ad")
        const newAd = Ad.create(req.body);
        const errors = await validate(newAd);
        if (errors.length !== 0) return res.status(422).send({ errors });
        const newAdWithId = await newAd.save();
        res.send(newAdWithId);
 */
    }
    find() {

    }
}

