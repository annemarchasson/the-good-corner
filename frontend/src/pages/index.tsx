/* import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Demo1 from "../components/Demo1";
import Count from "../components/Count";
import InputExo from "../components/InputExo";
import Select from "../components/Select";
import ListExo from "../components/ListExo";
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
         <h4 className={styles.titleExo}>exo 1 : faire un compteur </h4>
         <Count /> 
         <h4 className={styles.titleExo}>exo 2 : Demo1 au click changer le mot </h4>
         <Demo1 />
         <h4 className={styles.titleExo}>exo 3 : Input prénom et afficher prénom </h4>
         <InputExo />
         <h4 className={styles.titleExo}>exo 4 : Choisir la catégorie dans la list </h4>
         <Select />
         <h4 className={styles.titleExo}>exo 5: supprimer une catégorie et exo 6: ajouter un catégorie </h4>
         <ListExo/>
      </div>
    </>
  )
}
 */

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    
      <h1 className={styles.Bienvenue}>Bienvenue sur notre site!</h1>
      <div></div>
    </>
  );
}
// Home.title = "Accueil";

