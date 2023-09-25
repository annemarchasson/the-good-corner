import { Category } from "../entities/category_entity";
import  DataSource  from "../db";


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
    create(){
        
    }
    find(){
       
    }
}