
import axiosInstance from "@/lib/axiosInstance"; 
import styles from "@/styles/Ad.module.css"; 

import { IAdForm, FormEditOrCreate } from "@/types/ads"; 
import { Category } from "@/types/categories"; 
// Types/interfaces personnalisées

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 

// Interface structure erreur
interface IError {
  field: string | null;
  message: string;
}

// composant formulaire
function Form({ initialData }: FormEditOrCreate) {
  const router = useRouter(); // Hook accéder objet de route
  const [categories, setCategories] = useState<Category[]>([]); // state stocker catégories
  const [errors, setErrors] = useState<IError[]>([] as IError[]); // state stocker erreurs
  const [formulaireData, setFormulaireData] = useState<IAdForm>({} as IAdForm); // state stocker données du form

  //  déclenche 'errors' change
  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  //  déclenche une fois, chargement initial du composant
  useEffect(() => {
    // Requête liste catégories
    axiosInstance
      .get<Category[]>("/categories/list", {})
      .then(({ data }) => setCategories(data))
      .catch((err) => {
        console.log(err);
      });

    // Si données initiales, remplir le form
    if (initialData) {
      setFormulaireData(initialData);
    }
  }, []);

  // déclenche lorsque 'formulaireData' change
  useEffect(() => {
    console.log(formulaireData);
  }, [formulaireData]);

  // fonction changement données formulaire
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number | string | { id: number } = "";
    // Sélectionner la valeur appropriée en fonction du nom du champ de formulaire
    switch (e.target.name) {
      case "category":
        value = { id: +e.target.value };
        break;
      case "price":
        value = +e.target.value;
        break;
      default:
        value = e.target.value;
    }
    console.log(value);
    //seter données du form
    setFormulaireData({ ...formulaireData, [e.target.name]: value });
  };

  // Fonction message erreur pour un champ
  const getError = (field: string) => {
    let errorText = "";
    if (errors.length) {
      let error = errors.find((e) => e.field === field);
      if (error) {
        errorText = error.message;
      }
    }

    return errorText;
  };

  // Fonction envoie form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêcher la soumission normale du formulaire
    setErrors([]); // Réinitialiser les erreurs 

    // Si aucune donnée initiale , création d'annonce
    if (!initialData) {
      // requête créer une nouvelle annonce
      axiosInstance
        .post("/ads/create", formulaireData)
        .then(({ data }) => {
          //rediriger page catégorie annonce créée
          router.push(`/categories/view/${data.category?.id}`);
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.response.data?.errors); // Mettre à jour les erreurs en cas d'échec
        });
    } else {
      // Sinon, mise à jour d'annonce
      // requête mettre à jour l'annonce
      axiosInstance
        .patch(`/ads/update/${initialData.id}`, formulaireData)
        .then(({ data }) => {
          router.push(`/categories/view/${data.category?.id}`);
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.response.data?.errors);
        });
    }
  };

  // Rendu du composant
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
   
      <input
        name="title"
        placeholder="titre"
        className={styles.inputForm}
        onChange={handleChange}
        value={formulaireData.title}
      />
      <span>{getError("title")}</span> {/* Affichage si erreur*/}

      <input
        name="description"
        placeholder="description"
        className={styles.inputForm}
        onChange={handleChange}
        value={formulaireData.description}
      />

  
      <input
        name="owner"
        placeholder="owner"
        className={styles.inputForm}
        onChange={handleChange}
        value={formulaireData.owner}
      />

     
      <input
        name="price"
        placeholder="price"
        className={styles.inputForm}
        onChange={handleChange}
        type="number"
        step=".01"
        pattern="[0-9]*"
        value={formulaireData.price}
      />
      <span>{getError("price")}</span> {/* Affichage de erreur  */}


      <input
        name="location"
        placeholder="location"
        className={styles.inputForm}
        onChange={handleChange}
        value={formulaireData.location}
      />

      <input
        name="picture"
        placeholder="picture"
        className={styles.inputForm}
        onChange={handleChange}
        value={formulaireData.picture}
      />

   
      <select
        className={styles.inputForm}
        onChange={handleChange}
        name="category"
        value={formulaireData.category?.id}
      >
        <option>Choisissez une catégorie</option>
        {/* options du sélecteur en fonction catégories dispo */}
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* bouton envoyer form */}
      <button>{initialData ? "Editer l'annonce" : "Ajouter l'annonce"}</button>
    </form>
  );
}

export default Form;