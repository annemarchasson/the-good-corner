// Importation des modules et composants nécessaires
import axiosInstance from '@/lib/axiosInstance';  // Module axiosInstance pour effectuer des requêtes HTTP
import Link from 'next/link';                       // Composant Link de Next.js pour la navigation
import styles from '@/styles/pages/ads/Form.module.css';  // Styles CSS spécifiques pour cette page
import { Ad } from '@/types/ads';                  // Importation du type Ad
import { Category } from '@/types/categories';    // Importation du type Category
import { formatAmount } from '@/lib/utilities';    // Fonction utilitaire pour formater les montants
import { useEffect, useState } from 'react';       // Hooks React pour la gestion de l'état

// Composant React AdminAds pour gérer l'administration des annonces
function AdminAds() {
    const [categories, setCategories] = useState<Category[]>([]); // État pour stocker la liste des catégories
    const [ads, setAds] = useState<Ad[]>([]);                     // État pour stocker la liste des annonces

    const [filter, setFilter] = useState<number>();                // État pour stocker le filtre de catégorie

    // Effectuer une requête HTTP pour obtenir la liste des catégories
    useEffect(() => {
        axiosInstance
            .get<Category[]>("/categories/list", {})
            .then(({ data }) => setCategories(data));
    }, []);

    // Lorsque les catégories arrivent, définir le filtre initial sur la première catégorie
    useEffect(() => {
        if (categories.length) {
            setFilter(categories[0].id);
        }
    }, [categories]);

    // Effectuer une requête HTTP pour obtenir la liste des annonces en fonction du filtre de catégorie
    useEffect(() => {
        if (filter) {
            console.log("ALLER CHERCHER LES ANNONCES DE " + filter);
            axiosInstance
                .get<Ad[]>(`/ads/listByCategory/${filter}`)
                .then(({ data }) => setAds(data))
                .catch((error) => console.log(error));
        }
    }, [filter]);

    // Gérer le changement de sélection de catégorie dans le filtre
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(+e.target.value);
    };

    return (
        <div>
            <div>
                {categories.length && (
                    <>
                        Filtre:
                        {/* Sélecteur pour filtrer les annonces par catégorie */}
                        <select
                            className={styles.inputForm}
                            onChange={handleChange}
                            name="category"
                            value={filter}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>
            <div>
                Liste des annonces:
                {ads.length ? ( // Vérifie s'il y a des annonces à afficher
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad) => (
                                <tr key={ad.id}>
                                    <td>{ad.title}</td>
                                    <td>{formatAmount(ad.price)}</td>
                                    <td>
                                        {/* Liens pour éditer et supprimer chaque annonce */}
                                        <Link href={`/ads/edit/${ad.id}`}>Editer</Link>
                                        <Link href={`/ads/delete/${ad.id}`}>Supprimer</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Aucune annonce dans cette catégorie</div>
                )}
            </div>
        </div>
    );
}

export default AdminAds; // Exporte le composant AdminAds pour une utilisation ailleurs dans l'application
