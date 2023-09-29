// Importation des composants nécessaires
import CategoriesBar from "./layput-elements/CategoriesBar";
import Footer from "./layput-elements/Footer";
import Topbar from "./layput-elements/topbar/Topbar";
import styles from "@/styles/Layout1.module.css";

// Définition du composant Layout1 qui englobe la mise en page de la page principale
function Layout1({ children }: { children: JSX.Element }) {
  return (
    // La div principale avec une classe CSS styles.mainBloc pour styler la mise en page
    <div className={styles.mainBloc}>
      <div className={styles.container}>
        {/* La partie d'en-tête de la page contenant la barre supérieure et la barre des catégories */}
        <div className={styles.headerPage}>
          <Topbar /> {/* Composant Topbar pour l'en-tête supérieur */}
          <CategoriesBar /> {/* Composant CategoriesBar pour la barre des catégories */}
        </div>
        {/* La partie centrale de la page qui affiche le contenu de la page passée en tant qu'enfant */}
        <div className={styles.app}>{children}</div>
        {/* La partie de pied de page qui contient le composant Footer */}
        <div className={styles.footer}>
          <Footer /> {/* Composant Footer pour le pied de page */}
        </div>
      </div>
    </div>
  );
}

export default Layout1; // Exportation du composant Layout1 pour une utilisation ailleurs dans l'application
