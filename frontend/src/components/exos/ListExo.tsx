import React, { useState } from "react";
import { ChangeEvent } from "react";

// Interface définissant la structure d'une catégorie
interface Category {
  id: number;
  name: string;
}

function ListExo() {
  // Utilisation de useState pour gérer un état de catégories avec une valeur initiale
  const [categories, setCategorie] = useState<Category[]>([
    {
      id: 1,
      name: "cat1"
    },
    {
      id: 2,
      name: "cat2"
    },
    {
      id: 3,
      name: "cat3"
    },
    {
      id: 4,
      name: "cat4"
    },
  ]);

  // POUR SUPPRIMER UNE CATEGORIE
  const handleDelete = (id: number) => {
    // Créez une copie superficielle (shallow copy) du tableau categories
    const newCategories = [...categories];
    // Utilisez filter pour supprimer la catégorie avec l'ID donné
    const updatedCategories = newCategories.filter((category) => category.id !== id);
    // Mettez à jour l'état des catégories avec la nouvelle liste
    setCategorie(updatedCategories);
  };

  // POUR AJOUTER UNE CATEGORIE
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Gestionnaire de changement d'input pour l'ajout d'une nouvelle catégorie
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryInput(evt.target.value);
  };

  // Gestionnaire pour ajouter une catégorie
  const AddCategory = () => {
    // Vérifie si la catégorie existe déjà
    const cat = categories.find((category) => category.name === newCategoryInput);
    if (cat) {
      setError("Erreur : existe déjà");
      return;
    }
    // Crée une copie superficielle du tableau categories
    const NewArrayCat = [...categories];
    // Génère un nouvel ID pour la catégorie
    const id = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
    // Ajoute la nouvelle catégorie à la copie du tableau
    NewArrayCat.push({ id, name: newCategoryInput });
    // Met à jour l'état des catégories avec la nouvelle liste
    setCategorie(NewArrayCat);
    // Remise à zéro de l'input et de l'erreur
    setNewCategoryInput("");
    setError("");
  };

  return (
    <div>
      <ul>
        {/* Parcours des catégories et affichage */}
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            {/* Bouton pour supprimer une catégorie */}
            <button onClick={() => handleDelete(category.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div>
        <p>Ajouter catégorie</p>
        <label>
          {/* Input pour saisir le nom de la nouvelle catégorie */}
          <input
            value={newCategoryInput}
            onChange={handleChange}
          />
        </label>
        {/* Affichage de l'erreur s'il y en a une */}
        <p>{error}</p>
        {/* Bouton pour ajouter une nouvelle catégorie */}
        <button onClick={AddCategory}>
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default ListExo;
