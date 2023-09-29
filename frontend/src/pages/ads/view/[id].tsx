// Importation des modules et composants nécessaires
import SheetAd from "@/components/ads/SheetAd";    // Composant SheetAd pour afficher les détails de l'annonce
import axiosInstance from "@/lib/axiosInstance";    // Module axiosInstance pour effectuer des requêtes HTTP
import { Ad } from "@/types/ads";                  // Importation du type Ad
import { useRouter } from "next/router";           // Hook useRouter de Next.js pour la gestion des routes
import { useEffect, useState } from "react";        // Hooks React pour la gestion de l'état

// Interface pour définir le format des erreurs
interface IError {
  field: string | null;  // Champ associé à l'erreur (ou null si global)
  message: string;       // Message d'erreur
}

// Composant React ViewAd pour afficher les détails d'une annonce
function ViewAd() {
  const router = useRouter();
  const [ad, setAd] = useState<Ad>();         // État pour stocker les données de l'annonce
  const [loading, setLoading] = useState<boolean>(true); // État pour gérer l'état de chargement
  const [errors, setErrors] = useState<IError[]>([]);     // État pour stocker les erreurs

  // Effet déclenché lorsque l'identifiant de l'annonce dans l'URL change
  useEffect(() => {
    if (router.query.id) {
      // Effectuer une requête HTTP pour obtenir les données de l'annonce
      axiosInstance
        .get<Ad>(`/ads/find/${router.query.id}`)
        .then(({ data }) => {
          setAd(data);        // Mettre à jour les données de l'annonce
          setLoading(false);   // Mettre à jour l'état de chargement (terminé)
        })
        .catch((err: any) => {
          console.log("ERREUR RECUE ", err.response.data.errors);
          setErrors(err.response.data?.errors); // Mettre à jour les erreurs en cas d'échec de la requête
          setLoading(false); // Mettre à jour l'état de chargement (terminé)
        });
    }
  }, [router.query.id]);

  if (loading) {
    return <div>Chargement en cours</div>; // Afficher un message de chargement tant que les données ne sont pas prêtes
  }

  if (errors.length) {
    return (
      <ul>
        {errors.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    ); // Afficher les erreurs s'il y en a
  }

  return (
    <div>
      {ad ? ( // Vérifie si des données d'annonce sont disponibles
        <>
          {/* Afficher le composant SheetAd pour afficher les détails de l'annonce */}
          <SheetAd {...ad} />
          {/* Vous pouvez également afficher d'autres détails de l'annonce ici si nécessaire */}
        </>
      ) : (
        <div>annonce existe pas</div> // Afficher un message si l'annonce n'existe pas
      )}
    </div>
  );
}

export default ViewAd; // Exporte le composant ViewAd pour une utilisation ailleurs dans l'application
