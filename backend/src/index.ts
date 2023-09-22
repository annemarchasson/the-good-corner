// Importation Express.js et types Request/Response depuis package express
import express, { Request, Response } from "express";
import "reflect-metadata";
import ds from "./ds";
import {Ad} from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

/*SIGNIGICATION DE🔻:
Ancienne Couche de CODE que je garde pour comprendre l'évolution de mon code.*/

//🔻import sqlite3 from "sqlite3";
//🔻const db = new sqlite3.Database('good_corner');
// application Express
const app = express();
// numéro de port (3000)
const port = 3000;

// Ad type TS
/*🔻type Ad = {
    id: number;
    title: string;
    description: string;
    owner: string;
    price: number;
    picture: string;
    location: string;
    createdAt: string;
}
 */
// données factices
/*🔻 let ads: Ad[] = [
    {
        id: 1,
        title: "Bike to sell",
        description:
            "My bike is blue, working fine. I'm selling it because I've got a new one",
        owner: "bike.seller@gmail.com",
        price: 100,
        picture:
            "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
        location: "Paris",
        createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
          "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
          "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
  },
    // ... Autres annonces ...
]; */

// gérer les données JSON
app.use(express.json());

// Route afficher "Hello World"
app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

// Route afficher les ads annonces
/*🔻 app.get("/ads", (req: Request, res: Response) => {
    res.send(ads);
});
 */

//Route Afficher ads
app.get("/ads", async (req, res) => {
    /*🔻db.all("SELECT * FROM ad", (err, rows) => {
      if (!err) res.send(rows); */
      try {
        res.send(await Ad.find({
          relations: {
            category:true,
            tags:true,
          },
        }))
      } catch (err) {
      } res.sendStatus(500);
    });

/*🔻
app.post("/ads", (req: Request, res: Response) => {
   //pour incrémenter et ajouter un id
    const id = ads.length + 1; 
    // … spread opérateur, reprend toutes les propriétés + id dans le nouvel objet + une date de création
    const newAd = { ...req.body, id, createdAt: new Date().toISOString() };
    // Ajoute la nouvelle annonce
    ads.push(newAd);
    // Renvoie la nouvelle annonce en réponse
    res.send(newAd);
});
 */

// Route ajouter un annonce
app.post("/ads", async (req: Request, res: Response) => { 
   try {
    const newAd = Ad.create(req.body);
    res.send(await newAd.save());
   } catch (err) {
    console.log(err);
    res.sendStatus(500);
   }
});
    
     /*🔻 // … spread opérateur, reprend toutes les propriétés + id dans le nouvel objet + une date de création
     const newAd = { ...req.body, createdAt: new Date().toISOString() };

     //avec sql   (requete sécurisée/préparée sans les ?)
     db.run ( "INSERT INTO ad (title, description, owner, price, picture, localisation, createdAt) VALUES ($title, $description, $owner, $price, $picture, $localisation, $createdAt)" , {
        $title: req.body.title,
        $description: req.body.description,
        $owner: req.body.owner,
        $price: req.body.price,
        $picture: req.body.picture,
        $localisation: req.body.localisation,
        $createdAt: req.body.createdAt,
        });
        
     // Renvoie la nouvelle annonce en réponse
     res.send(newAd);
 }); */
 
// Route supprimer une annonce par son ID 
//compare l'ID de chaque annonce (ad.id) avec l'ID spécifié à supprimer (idDelete)
app.delete("/ads/:id", async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

/*🔻const idDelete = parseInt(req.params.id, 10); // Récupère id
    const deletedAd = ads.find((ad) => ad.id === idDelete); // Trouve ad avec id correspondant à id de la requète (idDelete)
    if (!deletedAd) { // si pas deletedAd donc annonce pas trouvée 
        return res.sendStatus(404); // renvoie une réponse 404
    } else { 
        // Filtre annonces pour supprimer celle avec id de la requète
        ads = ads.filter((ad) => ad.id !== idDelete);
        //variable ads est mise à jour avec la nouvelle liste qui ne contient pas l'annonce spécifiée pour la suppression via l'ID.
        res.status(204).send({ message: "Ad deleted" });
    } */
});

// Route mettre à jour une annonce par ID 
app.patch("/ads/:id", async (req: Request, res: Response) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(404);
    await Ad.update(parseInt(req.params.id, 10), req.body);
    await Ad.merge(adToUpdate, req.body);
    res.send(await adToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
    /*🔻 const idUpdate = parseInt(req.params.id, 10); // Récupère id
    const indexOfUpdate = ads.findIndex((ad) => ad.id === idUpdate); // Trouve l'index de l'annonce à mettre à jour
    //Si l'index de l'annonce à mettre à jour n'est pas trouvé (c'est-à-dire indexOfUpdate est égal à -1). Dans une liste commencent généralement à partir de 0 et sont des nombres positifs. Donc, si on obtient -1, cela veut dire que l'annonce n'est pas dans la liste.
    if (indexOfUpdate === -1) {
        return res.sendStatus(404); // Si l'annonce n'est pas trouvée, renvoie une réponse 404
    }
    // Met à jour l'annonce en fusionnant les données du corps de la requête avec les propriétés existantes de l'annonce
    ads[indexOfUpdate] = {
        ...ads[indexOfUpdate], //… spread opérateur, reprend toutes les propriétés 
        ...req.body, // on y ajoute la mise à jour via la requète
    };
    // Renvoie l'annonce mise à jour en réponse
    res.send(ads[indexOfUpdate]); */
});

// Écoute le port spécifié et affiche un message lorsque le serveur démarre
app.listen(port, async () => {
  await ds.initialize();
  console.log(`Server running on http://localhost:${port}`);
});

/* 🔻
app.post("/ads", (req: Request, res: Response) => {
  const newAd: Ad = {
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  db.run(
    "INSERT INTO ad (title, owner, description, price, picture, location, createdAt) VALUES ($title, $owner, $description, $price, $picture, $location, $createdAt)",
    {
      $title: req.body.title,
      $owner: req.body.owner,
      $description: req.body.description,
      $price: req.body.price,
      $picture: req.body.picture,
      $location: req.body.location,
      $createdAt: newAd.createdAt,
    },
    function (this: any, err: any) {
      if (!err)
        return res.send({
          ...newAd,
          id: this.lastID,
        });
      console.log(err);
      res.sendStatus(500);
    }
  );
});

app.delete("/ads/:id", (req: Request, res: Response) => {
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row) return res.sendStatus(404);
    db.run("DELETE FROM ad WHERE id = ?", [req.params.id], (err: any) => {
      if (!err) return res.sendStatus(204);
      console.log(err);
      res.sendStatus(500);
    });
  });
});

app.patch("/ads/:id", (req: Request, res: Response) => {
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!row) return res.sendStatus(404);

    // creates a string with this shape : "title = $title, description = $description, ..."
    const setProps = Object.keys(req.body)
      .reduce<string[]>((acc, prop) => [...acc, `${prop} = $${prop}`], [])
      .join(", ");

    // creates an object with this shape : {$title: "title sent by client", "$description: " description sent by client", ...}
    const propsToUpdate = Object.keys(req.body).reduce(
      (acc, prop) => ({ ...acc, [`$${prop}`]: req.body[prop] }),
      {}
    );

    db.run(
      `UPDATE ad SET ${setProps} WHERE id = $id`,
      { ...propsToUpdate, $id: req.params.id },
      (err: any) => {
        if (!err) return res.send({ ...row, ...req.body });
        console.log(err);
        res.sendStatus(500);
      }
    );
  });
});


 */

