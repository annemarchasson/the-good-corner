import { Router, Request, Response } from "express";
import { validate } from "class-validator";
import TagService from "../services/tags.service";
import { ICreateTag, IListTag } from "../types/tag";

// Création d'une instance de routeur Express
const router = Router();

// Route pour récupérer la liste des tags
router.get("/list", async (req: Request, res: Response) => {
  try {
    const { name } = req.query as unknown as IListTag;
    const tags = await new TagService().list(name); // Appel du service pour récupérer la liste des tags
    res.send(tags); // Répond avec la liste des tags
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour créer un nouveau tag
router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: ICreateTag = req.body;
    const newTag = new TagService().create({ ...data }); // Appel du service pour créer un nouveau tag
    res.send(newTag); // Répond avec le nouveau tag créé
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message }); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500 et un message d'erreur
  }
});

// Route pour supprimer un tag par ID
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const tagToDelete = await new TagService().delete(+req.params.id); // Appel du service pour supprimer un tag par ID
    res.sendStatus(204).json(tagToDelete); // Répond avec un code 204 (No Content) pour indiquer que la suppression a réussi
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message }); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500 et un message d'erreur
  }
});

export default router;
