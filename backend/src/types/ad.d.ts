export interface Ad {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  tags: Tag[];
}

// Interface IAdForm représente un formulaire pour créer ou mettre à jour une annonce
export interface IAdForm extends Omit<Ad, "createdAt" | "updatedAt" | "tags"> {
  id?: number | undefined;        // Identifiant de l'annonce (facultatif, pour l'édition)
  category: Omit<Category, "name">; // Catégorie à laquelle appartient l'annonce (objet Category sans le nom)
}