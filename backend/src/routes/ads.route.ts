import { Router, Request, Response } from "express";
import { Ad } from "../entities/ad.entity";
import { In } from "typeorm";
import { validate } from "class-validator";
import AdsService from "../services/ads.service";
import CategoryService from "../services/category.service";
import { IAdForm } from "../types/ad";
import { formatedErrors } from "../lib/utilities";

const router = Router();

// Route pour récupérer une annonce par son ID
router.get("/find/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ad = await new AdsService().find(+id); // Appel du service pour trouver une annonce par ID
    res.json(ad); // Répond avec l'annonce trouvée
  } catch (err: any) {
    console.log(err);
    res.status(500).json(formatedErrors(err)); // En cas d'erreur, renvoie une réponse avec des erreurs formatées
  }
});

// Route pour récupérer la liste des annonces
router.get("/list", async (req: Request, res: Response) => {
  const { tagIds } = req.query;
  try {
    const ads = await new AdsService().list(tagIds ? (tagIds as string) : ""); // Appel du service pour récupérer la liste des annonces
    res.send(ads); // Répond avec la liste des annonces
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour récupérer la liste des annonces par catégorie
router.get("/listbycategory/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await new CategoryService().find(+id);

  if (!category) {
    throw new Error("La catégorie n'existe pas");
  }

  try {
    const ads = await new AdsService().listByCategory(+id); // Appel du service pour récupérer la liste des annonces par catégorie
    res.send(ads); // Répond avec la liste des annonces
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour créer une nouvelle annonce
router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: IAdForm = req.body;
    const newAd = await new AdsService().create(data); // Appel du service pour créer une nouvelle annonce
    res.send(newAd); // Répond avec la nouvelle annonce créée
  } catch (err: any) {
    console.log(err);
    res.status(500).json(formatedErrors(err)); // En cas d'erreur, renvoie une réponse avec des erreurs formatées
  }
});

// Route pour supprimer une annonce par ID
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const adToDelete = await new AdsService().delete(+id); // Appel du service pour supprimer une annonce par ID
    res.json(adToDelete); // Répond avec les données de l'annonce supprimée
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

// Route pour mettre à jour une annonce par ID
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const data: IAdForm = req.body;
    const { id } = req.params;
    const adToUpdate = await new AdsService().update(+id, data); // Appel du service pour mettre à jour une annonce par ID
    res.send(adToUpdate); // Répond avec les données de l'annonce mise à jour
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur, renvoie une réponse avec un code d'erreur 500
  }
});

export default router;
