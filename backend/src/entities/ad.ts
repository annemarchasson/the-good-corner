import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from "typeorm";

import {Category} from "./category";
import { Tag } from "./tag";

  @Entity ()
  export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn ()
    id:number;
  @Column ({ length: 100 })
   title:string;
  @Column ({nullable: true, type: "text" })
   description: string;
  @Column () 
   owner: string;
  @Column ({type: "float" })
   price:number;
  @Column ({nullable: true})
   picture:string;
   @Column ({nullable: true})
   location:string;
   @CreateDateColumn ({nullable: true})
   createdAt:string;

   // une categry à plusieurs annonces
   @ManyToOne(()=> Category, (category) => category.ads, {
    cascade :true,
    onDelete: "CASCADE",
   })
   category: Category;
  
  // un tag peut etre sur plusieurs annonces
  @ManyToMany (()=> Tag)
  @JoinTable()
  tags: Tag[];
  }