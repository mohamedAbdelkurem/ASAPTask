
import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";

import Service from "../entity/service";
//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

const createService = async (req: Request, res: Response) => {
    const { serviceName } = req.body;

    let errors: any = {};
    try {

        if (!serviceName) errors.serviceName = "cannot be empty !!";
        if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
        const newService = await new Service({ serviceName }).save()
        return res.status(200).json(newService);
    } catch (error) {
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};




//get service

const getService = async (req: Request, res: Response) => {
const { id } = req.params;
 //const { id } = req.body;
    console.log(id)
    try {
      const service = await Service.findOne(id);
      console.log(service)
      if (!service) throw new Error("Service not found");
      return res.status(200).json(service);
    } catch (error) {
      console.log(error)
      switch (error.message) {
        case "Service not found":
          return res.status(404).json({ error: error.message });
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

//!GET Services
const getServices = async (_: Request, res: Response) => {
    try {
      
      const services = await Service.find();
     //console.log(articles)
      return res.status(200).json(services);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something went wrong" });
    }
  };


//Delete Service


const deleteServices = async (req: Request, res: Response) => {
   
    const { id } = req.params;
    try {
      const article = await Service.findOne(id);
      if (!article) throw new Error("service not found");
      console.log(article)
      await Service.delete(id);
     
  
      return res.status(200).json({ success: "service is deleted succefully" });
    } catch (error) {
      console.log(error);
      switch (error.message) {
        case "service not found":
          return res.status(404).json({ error: error.message });
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

 

  // UPDATE  ARTICLE
const updateService = async (req: Request, res: Response) => {
  
    let errors: any = {};
   
    const { serviceName} = req.body;
  

    if (!serviceName) errors.serviceName = "cannot be empty !!";
    if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")

    try {
      if (Object.keys(errors).length > 0) throw new Error("input error");
      const foundService = await Service.findOne({
        where: { id: req.params.id },
      });
      if (!foundService) throw new Error("Service not found");
      const updatedArticle = await getConnection()
        .createQueryBuilder()
        .update(Service)
        .set({
         serviceName
         
        })
        .where( "id = :id",{
          id: req.params.id,
        })
        .execute();
      return res.status(200).json(updatedArticle);
    } catch (error) {
      switch (error.message) {
        case "article not found":
          return res.status(404).json({ error: error.message });
        case "input error":
          return res.status(403).json(errors);
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

const router = Router();
//api/articles
//api/ admin/articles

router.post("/" ,user,auth,admin, createService);
router.put("/:id", updateService);

router.get("/",getServices);
router.get("/:id" ,getService);

router.delete("/:id",deleteServices)

export default router;
