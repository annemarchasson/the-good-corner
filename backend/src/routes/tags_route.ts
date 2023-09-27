import { Router, Request, Response } from "express";
import { validate } from "class-validator";
import TagService from "../services/tag_service";
import {  ICreatingTag, IlistTag } from "../types/tag";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const { name } = req.query as unknown as IlistTag;
    const tags = await new TagService().list(name);
    res.send(tags);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    // const data = req.body as ICreateTag;
    const data:  ICreatingTag = req.body;
    const newTag = new TagService().create({ ...data });
    res.send(newTag);
  } catch (err: any) {
    console.log(err);
    res.sendStatus(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const tagToDelete = await new TagService().delete(+req.params.id);
    res.sendStatus(204).json(tagToDelete);
  } catch (err: any) {
    console.log(err);
    res.sendStatus(500).json({ message: err.message });
  }
});

export default router;