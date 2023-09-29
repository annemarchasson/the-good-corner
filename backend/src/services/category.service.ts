import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { ICreateCategory } from "../types/category";
import datasource from "../db";

export default class CategoryService {
  db: Repository<Category>;

  constructor() {
    this.db = datasource.getRepository(Category); // Initialise la base de données pour l'entité Category
  }

  // Fonction pour récupérer la liste des catégories
  async list() {
    const categories = await this.db.find({
      relations: {
        ads: true,
      },
    });

    return categories; // Retourne la liste des catégories avec leurs annonces associées
  }

  // Fonction pour créer une nouvelle catégorie
  async create({ name }: ICreateCategory) {
    const newCategory = this.db.create({ name }); // Crée une nouvelle instance de catégorie avec le nom spécifié
    return await this.db.save(newCategory); // Enregistre la nouvelle catégorie dans la base de données et la retourne
  }

  // Fonction pour trouver une catégorie par ID
  async find(id: number) {
    return await this.db.findOneBy({ id }); // Recherche une catégorie par son ID et la retourne
  }
}
