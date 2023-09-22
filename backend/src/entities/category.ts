import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToMany,
  } from "typeorm";
  import {Ad} from "./ad";

  @Entity ()
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn ()
    id:number;
  @Column ({ length: 100 })
    name:string;
  
  // annonces appartient à une categorie
  @OneToMany(() => Ad, ad => ad.category)
  ads: Ad[];
}