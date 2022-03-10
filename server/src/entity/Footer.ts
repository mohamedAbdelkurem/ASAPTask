import {
    Entity as TYPEORM_ENTITY, Column, Index, JoinColumn,
    ManyToOne,
  } from "typeorm";
  
 
  import User from "./User";
  import Entity from "./Entity";


  
  @TYPEORM_ENTITY("footer")
  export default class Footer extends Entity {
    
    constructor(footer: Partial<Footer>) {
      super();
      Object.assign(this, footer);
    }
    @Index()
    @Column({ unique: true })
    link: string;
  
  

    @ManyToOne(() => User, (user) => user.footer, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    @JoinColumn({ name: "addedby", referencedColumnName: "username" })
    user: User;
  
  
  
  }
  