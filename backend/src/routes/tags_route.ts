import { Router, Request, Response } from "express";
import { Tag } from "../entities/tag_entity";
import { validate } from "class-validator";
import TagService from "../services/tag_service";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
   /*  const tags = await Tag.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
    }); */
    const tags = await TagService.list(name as string);
    res.send(tags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const newTag = Tag.create(req.body);
    const errors = await validate(newTag);
    if (errors.length !== 0) return res.status(422).send({ errors });
    res.send(await newTag.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const tagToDelete = await Tag.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!tagToDelete) return res.sendStatus(404);
    await tagToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;