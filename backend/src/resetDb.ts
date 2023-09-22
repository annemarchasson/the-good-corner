import ds from "./ds";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";
async function main() {
  await ds.initialize();
  const ad1= Ad.create({
    title: "Macbook",
    description: "description of the computer...",
    owner: "Pierre",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Lyon",
    
  });

const cat1 = Category.create({name: "informatique"});
const tag1 = Tag.create({name:"voyage"});

await ad1.save();
await cat1.save();
await tag1.save();

ad1.category = cat1;
await ad1.save();
}
main(); 

/* import ds from "./ds";
import { Ad } from "./entities/ad";

async function main() {
  await ds.initialize();
  await Ad.create({
    title: "Macbook",
    description: "description of the computer...",
    owner: "Pierre",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    location: "Lyon",
  }).save();
}

main(); */