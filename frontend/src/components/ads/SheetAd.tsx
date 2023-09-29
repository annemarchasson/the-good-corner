import { Ad } from "@/types/ads";
import { formatAmount } from "@/lib/utilities";

function SheetAd({title, price, description}:  Ad) {
return (
    <>
    <div>Titre: {title}</div>
    <div>Prix: {formatAmount(price)}</div>
    <div>description: {description}</div>
    </>
)

}
export default SheetAd;