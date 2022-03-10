import {
    Entity as TYPEORM_ENTITY, Column, Index, JoinColumn,
    ManyToOne,
  } from "typeorm";
  
 
  import User from "./User";
  import Entity from "./Entity";


  
  @TYPEORM_ENTITY("services")
  export default class Service extends Entity {
    
    constructor(service: Partial<Service>) {
      super();
      Object.assign(this, service);
    }
    @Index()
    @Column({ unique: true })
    serviceName: string;
  

    @Column({ default: "defaultpp.jpg" })
    imageUrn: string;

    @ManyToOne(() => User, (user) => user.service, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    @JoinColumn({ name: "addedby", referencedColumnName: "username" })
    user: User;
  
  
  
  }
  