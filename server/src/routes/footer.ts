
import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";

// import Footer from "../entity/Footer";
//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Footer from "../entity/Footer";

const createFooter = async (req: Request, res: Response) => {
    const { link } = req.body;

    let errors: any = {};
    try {

     
        if (!link) errors.link = "cannot be empty !!";
        if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
        const newFooter = await new Footer({ link }).save()
        return res.status(200).json(newFooter);
    } catch (error) {
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};








//!GET Services
const getLinksFooter = async (_: Request, res: Response) => {
    try {
      
      const linksFooter = await Footer.find();
     
      return res.status(200).json(linksFooter);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something went wrong" });
    }
  };




 

const router = Router();


router.post("/" ,user,auth,admin, createFooter);


router.get("/",getLinksFooter);


export default router;
