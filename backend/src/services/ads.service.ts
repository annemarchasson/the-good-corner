import { In, Repository } from "typeorm";
import { Ad } from "../entities/ad.entity";
import datasource from "../db";
import { IAdForm } from "../types/ad";
import { validate } from "class-validator";
import CategoryService from "./category.service";
import { aggregateErrors } from "../lib/utilities";

export default class AdsService {
  db: Repository<Ad>;

  constructor() {
    this.db = datasource.getRepository(Ad); // Initialise la base de données pour l'entité Ad
  }

  // Fonction pour récupérer la liste d'annonces en fonction des IDs de tags
  async list(tagIds: string) {
    return await this.db.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
      },
    });
  }

  // Fonction pour récupérer la liste d'annonces par catégorie
  async listByCategory(id: number) {
    return await this.db.find({
      where: { category: { id } },
      order: { createdAt: "DESC" },
    });
  }

  // Fonction pour trouver une annonce par ID
  async find(id: number) {
    const ad = await this.db.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!ad) {
      throw new AggregateError([
        {
          field: null,
          message: "L'annonce n'existe pas",
        },
      ]);
    }
    return ad;
  }

  // Fonction pour créer une nouvelle annonce
  async create(data: IAdForm) {
    const newAd = this.db.create(data);
    const errors = await validate(newAd);

    if (errors.length !== 0) {
      throw new AggregateError(aggregateErrors(errors));
    }

    const { category, ...rest } = { ...newAd };
    const categoryToLink = await new CategoryService().find(category?.id);

    if (!categoryToLink) {
      throw new Error("La catégorie n'existe pas!");
    }

    return await this.db.save({ ...rest, category: categoryToLink });
  }

  // Fonction pour supprimer une annonce par ID
  async delete(id: number) {
    const adToDelete = await this.find(id);

    if (!adToDelete) {
      throw new Error("L'annonce n'existe pas!");
    }

    return await this.db.remove(adToDelete);
  }

  // Fonction pour mettre à jour une annonce par ID
  async update(id: number, data: IAdForm) {
    const adToUpdate = await this.find(id);

    if (!adToUpdate) {
      throw new Error("L'annonce n'existe pas!");
    }

    const adToSave = this.db.merge(adToUpdate, data);
    const errors = await validate(adToSave);

    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("Il y a eu une erreur");
    }

    return await this.db.save(adToSave);
  }
}
