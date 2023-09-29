import { Router, Request, Response } from "express";
import { Category } from "../entities/category.entity";
import CategoryService from "../services/category.service";
import { ICreateCategory } from "../types/category";

// Création d'une instance de routeur Express
const router = Router();

// Route pour récupérer la liste des catégories
router.get("/list", async (_, res: Response) => {
  try {
    const categories = await new CategoryService().list(); // Appel du service pour récupérer la liste des catégories
    res.send(categories); // Répond avec la liste des catégories
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour créer une nouvelle catégorie
router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: ICreateCategory = req.body;
    const newCategory = await new CategoryService().create({ ...data }); // Appel du service pour créer une nouvelle catégorie
    res.send(newCategory); // Répond avec la nouvelle catégorie créée
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour récupérer une catégorie par son ID (la fonctionnalité n'est pas implémentée)
router.get("/find/:id", async (_, res: Response) => {
  // Vous devez implémenter la logique pour récupérer une catégorie par ID ici
  // Pour le moment, cette route ne fait rien
});

export default router;
