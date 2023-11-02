import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import axiosInstance from "@/lib/axiosInstance";
import styles from "@/styles/Ad.module.css";

import { IAdForm, FormEditOrCreate } from "@/types/ads";
import { Category } from "@/types/categories";
// Types/interfaces personnalisées

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const schema = yup
    .object({
        title: yup.string().min(5, "longueur min 5").required("Le prénom est requis"),
        description: yup.string(),
        owner: yup.string().required("le créateur est requis"),
        price: yup.number().typeError("doit etre nombre").positive("prix positif").required("prix requis"),
        location: yup.string().required("emplacement requis"),
        picture: yup.string().required("image requise"),
        category: yup.number().required("choisir categorie"),
    })
    .required()


export default function FormReactHook() {

    const router = useRouter(); // Hook accéder objet de route
    const [categories, setCategories] = useState<Category[]>([]); // state stocker catégories


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data: any) => console.log(data)

    //  déclenche une fois, chargement initial du composant
    useEffect(() => {
        // Requête liste catégories
        axiosInstance
            .get<Category[]>("/categories/list", {})
            .then(({ data }) => setCategories(data))
            .catch((err) => {
                console.log(err);
            });

        /*  // Si données initiales, remplir le form
         if (initialData) {
           setFormulaireData(initialData);
         } */
    }, []);

    /* // déclenche lorsque 'formulaireData' change
    useEffect(() => {
      console.log(formulaireData);
    }, [formulaireData]); */

    // fonction changement données formulaire
    /* const handleChange = (
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
    };*
   */

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>titre annonce</label>
            <input {...register("title")} />
            <p>{errors.title?.message}</p>

            <label>description</label>
            <input {...register("description")} />
            <p>{errors.description?.message}</p>

            <label>créateur</label>
            <input {...register("owner")} />
            <p>{errors.owner?.message}</p>

            <label>prix</label>
            <input {...register("price")} />
            <p>{errors.price?.message}</p>

            <input {...register("location")} />
            <p>{errors.location?.message}</p>

            <input {...register("picture")} />
            <p>{errors.picture?.message}</p>

            <label>categories</label>
            <select {...register("category")}>
                <option>Choisissez une catégorie</option>
                {/* options du sélecteur en fonction catégories dispo */}
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
            <p>{errors.category?.message}</p>



            <input type="submit" />
        </form>
    )
}