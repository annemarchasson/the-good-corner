import { Router, Request, Response } from "express";
import CategoryService from "../services/category_service";
import { ICreateCategory } from "../types/category";
const router = Router();

router.get("/list", async (_, res: Response) => {
  try {
    // Appel de la méthode "list" de CategoryService
    const categories = await new CategoryService().list();
    res.send(categories);
  } catch (err) {
    console.error(err); // Utilisez console.error pour les erreurs
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: ICreateCategory = req.body;
    // Créez une instance de CategoryService
    const categoryService = new CategoryService();
    // Appel de la méthode "create" de CategoryService
    const newCategory = await categoryService.create({ ...data });
    res.send(newCategory);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;