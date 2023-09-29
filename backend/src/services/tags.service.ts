import { Like, Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import datasource from "../db";
import { ICreateTag } from "../types/tag";
import { validate } from "class-validator";

export default class TagService {
  db: Repository<Tag>;

  constructor() {
    this.db = datasource.getRepository(Tag); // Initialise la base de données pour l'entité Tag
  }

  // Fonction pour récupérer la liste des tags en fonction du nom (partiellement)
  async list(name: string) {
    const tags = await this.db.find({
      where: { name: name ? Like(`%${name}%`) : undefined }, // Recherche des tags dont le nom contient la chaîne spécifiée (partiellement)
    });
    return tags; // Retourne la liste des tags correspondants
  }

  // Fonction pour créer un nouveau tag
  async create(data: ICreateTag) {
    const newTag = this.db.create(data); // Crée une nouvelle instance de tag avec les données spécifiées
    const errors = await validate(newTag); // Valide les données du tag en utilisant les règles définies dans les decorators de l'entité

    if (errors.length !== 0) {
      console.log("errors", errors);
      // return res.status(422).send({ errors }); // Si des erreurs de validation sont présentes, vous pouvez renvoyer une réponse avec un code d'erreur 422 et les erreurs
      throw new Error("Une erreur s'est produite"); // En cas d'erreurs, lance une erreur avec un message
    }

    return await this.db.save(newTag); // Enregistre le nouveau tag dans la base de données et le retourne
  }

  // Fonction pour supprimer un tag par ID
  async delete(id: number) {
    const tagToDelete = await this.db.findOneBy({
      id,
    });

    if (!tagToDelete) {
      throw new Error("Ce tag n'existe pas"); // Si le tag n'existe pas, lance une erreur avec un message
    }

    await this.db.remove(tagToDelete); // Supprime le tag de la base de données
    return tagToDelete; // Retourne les données du tag supprimé
  }
}
