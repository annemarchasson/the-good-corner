// Importation des modules et composants nécessaires
import Form from "@/components/ads/Form";      // Composant Form pour l'édition d'une annonce
import axiosInstance from "@/lib/axiosInstance"; // Module axiosInstance pour effectuer des requêtes HTTP
import { Ad } from "@/types/ads";               // Importation du type Ad
import { useRouter } from "next/router";        // Hook useRouter de Next.js pour la gestion des routes
import { useEffect, useState } from "react";    // Hooks React pour la gestion de l'état

// Composant React ViewEdit pour afficher et éditer une annonce
function ViewEdit() {
  const router = useRouter();
  const [ad, setAd] = useState<Ad>();       // État pour stocker les données de l'annonce
  const [loading, setLoading] = useState<boolean>(true); // État pour gérer l'état de chargement

  // Effet déclenché lorsque l'identifiant de l'annonce dans l'URL change
  useEffect(() => {
    if (router.query.id) {
      // Effectuer une requête HTTP pour obtenir les données de l'annonce
      axiosInstance.get<Ad>(`/ads/find/${router.query.id}`).then(({ data }) => {
        setAd(data);        // Mettre à jour les données de l'annonce
        setLoading(false);   // Mettre à jour l'état de chargement (terminé)
      });
    }
  }, [router.query.id]);

  if (loading) {
    return <div>Chargement en cours</div>; // Afficher un message de chargement tant que les données ne sont pas prêtes
  }

  return (
    <div>
      {ad ? ( // Vérifie si des données d'annonce sont disponibles
        <>
          {/* Afficher le composant Form pour l'édition de l'annonce avec les données initiales */}
          <Form initialData={ad}/>
          {/* Vous pouvez également afficher d'autres détails de l'annonce ici si nécessaire */}
        </>
      ) : (
        <div>annonce existe pas</div> // Afficher un message si l'annonce n'existe pas
      )}
    </div>
  );
}

export default ViewEdit; // Exporte le composant ViewEdit pour une utilisation ailleurs dans l'application
