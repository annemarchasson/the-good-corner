import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Ad } from "./ad.entity";
import { Length } from "class-validator";

// Définition de l'entité "Tag" qui représente une balise ou un libellé associé aux annonces
@Entity()
export class Tag extends BaseEntity {
  // Clé primaire générée automatiquement
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de la balise avec validation de longueur (entre 2 et 50 caractères)
  @Column()
  @Length(2, 50)
  name: string;

  // Relation ManyToMany avec les annonces liées à cette balise
  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}
