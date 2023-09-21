import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from "typeorm";

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
  }
  