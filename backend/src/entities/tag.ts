import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToMany,
  } from "typeorm";
  import {Ad} from "./ad";

  @Entity ()
  export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn ()
    id:number;
  @Column ({ length: 100 })
    name:string;
  
  // annonces peut avoir un tag
  @ManyToMany(() => Ad, ad => ad.tags)
  ads: Ad[];
}