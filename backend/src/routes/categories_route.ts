import { Router, Request, Response } from "express";
import CategoryService from "../services/category_service";
import IcreateCategory from "../types/category";
const router = Router();


router.get("/list", async (_, res: Response) => {
  try {
    /* const categories = await Category.find({
      relations: {
        ads: true,
      },
    });
    res.send(categories); */
    const categories = await CategoryService.list();

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {

  const data: IcreateCategory = req.body;
  const newCategory = await new CategoryService().create({...data });
  res.send(newCategory);
} catch (err) {
  console.log(err);
  res.sendStatus(500);
}
});





export default router;