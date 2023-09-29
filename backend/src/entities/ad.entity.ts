import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";

// Définition de l'entité "Ad" qui représente une annonce
@Entity()
export class Ad extends BaseEntity {
  // Clé primaire générée automatiquement
  @PrimaryGeneratedColumn()
  id: number;

  // Titre de l'annonce avec validation de longueur
  @Column({ length: 50 })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;

  // Description de l'annonce (optionnelle)
  @Column({ nullable: true, type: "text" })
  description: string;

  // Propriétaire de l'annonce
  @Column()
  owner: string;

  // Prix de l'annonce avec validation de valeur minimale
  @Column({ type: "float" })
  @Min(0, { message: "Le prix doit être positif" })
  price: number;

  // Localisation de l'annonce
  @Column()
  location: string;

  // Chemin vers l'image associée à l'annonce
  @Column()
  picture: string;

  // Date de création de l'annonce (gérée automatiquement)
  @CreateDateColumn()
  createdAt: string;
  
  // Date de mise à jour de l'annonce (gérée automatiquement)
  @UpdateDateColumn()
  updatedAt: string;

  // Relation ManyToOne avec la catégorie de l'annonce
  @ManyToOne(() => Category, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  // Relation ManyToMany avec les tags associés à l'annonce
  @JoinTable()
  @ManyToMany(() => Tag, (t) => t.ads, {
    cascade: true,
  })
  tags: Tag[];
}
