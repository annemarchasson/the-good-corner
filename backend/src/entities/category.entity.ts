import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ad } from "./ad.entity";

// Définition de l'entité "Category" qui représente une catégorie d'annonces
@Entity()
export class Category {
  // Clé primaire générée automatiquement
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de la catégorie
  @Column()
  name: string;

  // Relation OneToMany avec les annonces liées à cette catégorie
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
