import { Request, Response } from "express";
import * as fileService from "../../services/file/file.service";
import { DataFile } from "../../types/file";

export const getFile = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  try {
    const file = await fileService.fetchData(id);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};
