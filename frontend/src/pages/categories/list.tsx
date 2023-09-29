import Card from "@/components/categories/Card";
import axiosInstance from "@/lib/axiosInstance";
import styles from "@/styles/Category.module.css";
import { Category } from "@/types/categories";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {

    axiosInstance
      .get<Category[]>("/categories/list")
      .then(({ data }) => setCategories(data));
  }, []);
  return (
    <div>
      Liste des catégories
      <div className={styles.cardBloc}>
        {categories.map((c) => (
          <Card key={c.id} id={c.id} name={c.name} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
