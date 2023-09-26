import Link from "next/link";
import Logo from "../../common/Logo";
import SearchBar from "./SearchBar";
import styles from 'src/styles/TopBar.module.css'

function Topbar() {
  return (
    <nav className={styles.topbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div>
        <SearchBar />
      </div >
      <div className={styles.addAdBtn}>
      <Link href={"/ads/create"}>Ajouter une annonce</Link>
      </div>
    </nav>
  );
}

export default Topbar;


{/*  se rendre sur une autre route c'est rendre un composant à la place d'un 
      autre et pas charger une page : différence entre a et link 
      donc SINGLE PAGE APP*/}