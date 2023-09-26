import { Category } from "../entities/category_entity";
import { Repository } from "typeorm";
import  DataSource  from "../db";
import ICreateCategory from "../types/category";

export default class CategoryService{
    db: Repository<Category>;
    constructor(){
        this.db = DataSource.getRepository(Category);
    }
    static async list() {
        console.log("Je suis dans ma méthode List de Category")
        const categories = await this.db.find({
            relations: {
              ads: true,
            },
          });  
          return categories;  
    }
    async create({name}: ICreateCategory){
        const newCategory = this.db.create({name});
        return await this.db.save(newCategory);
        
    }
    find(){
       
    }
}