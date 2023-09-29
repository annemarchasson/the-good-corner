import { Ad } from "@/types/ads";
import { useRouter } from "next/router";
import CardAd from "@/components/ads/CardAd";
import { useEffect, useState } from "react";
import styles from "@/styles/Category.module.css";
import axiosInstance from "@/lib/axiosInstance";

function ViewCategory() {
  const router = useRouter();

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    // getAds();
    if (router.query.id) {
      axiosInstance
        .get<Ad[]>(
          `/ads/listbycategory/${router.query.id}`
        )
        .then(({ data }) => {
          console.log(data);
          setAds(data);
        });
    }
  }, [router.query.id]);

  /**======================
   *    conditions plus complexes qu'un ternaire
   *========================**/
  // const monexemple = () => {
  //   let result = <></>;
  //   if (ads.length > 0) {
  //     result = <div>Tiens j'ai des annonces</div>;
  //   } else {
  //     result = <div>Il n'y a pas d'annonces</div>;
  //   }
  //   return result;
  // };
  return (
    <div>
      Visualisation de la catégorie ayant id : {router.query.id}
      <div className={styles.imageBloc}>
        {/* {monexemple()} */}
        {ads.length > 0 ? (
          // {ads.length ? (
          ads.map((a) => (
            <CardAd
              key={a.id}
              id={a.id}
              picture={a.picture}
              price={a.price}
              title={a.title}
            />
          ))
        ) : (
          <div>Revenez plus tard, pas annonce</div>
        )}
      </div>
    </div>
  );
}
ViewCategory.title = "Détail catégorie";
export default ViewCategory;