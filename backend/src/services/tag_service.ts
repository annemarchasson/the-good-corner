import { Tag } from "../entities/tag_entity";
import { Like } from "typeorm";
export default class TagService{
    constructor(){

    }
    static async list(name: string) {
        console.log("Je suis dans ma méthode List de Tag")
        const tags = await Tag.find({
            where: { name: name ? Like(`%${name}%`) : undefined },
          });
          return tags;  
    }
    create(){
        
    }
    find(){
       
    }
}