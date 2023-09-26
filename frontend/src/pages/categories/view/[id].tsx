import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from 'src/styles/Category.module.css'

function ViewCategory() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query.id);
  }, []);

  return (
    <div className={styles.CategoryId}>Visualisation de la catégorie ayant id : {router.query.id}</div>
  );
}

export default ViewCategory;
