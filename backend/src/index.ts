import express, {Request, Response} from "express";

const app = express();
const port = 3000;

//typer objet ci dessous:
type Ad = {
    id:number;
    title:string;
    description:string;
    owner:string;
    price:number;
    picture:string;
    location:string;
    createdAt:string;
}
//objet avec données
const ads:Ad[] = [
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
  ];
  
app.use(express.json()); 

//définition première route afficher hello world
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

//route afficher les ads
app.get("/ads", (req: Request, res: Response) => {
    res.send(ads);
  });

//définition route ajouter ad
app.post("/ads", (req: Request, res: Response) => {
    const id = ads.length + 1  
//pour incrémenter et ajouter un id
 const newAd = {...req.body ,id, createAt:new Date().toISOString(), }  
// … spread opérateur, reprend toutes les propriétés + id dans le nouvel objet + une date de création

    ads.push(req.body)
    res.send(newAd);
   });
   

//sur quel port on est 
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

