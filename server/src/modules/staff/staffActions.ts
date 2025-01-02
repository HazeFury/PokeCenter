import type { RequestHandler } from "express";

import itemRepository from "./staffRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const staff = await itemRepository.readAll();

    res.json(staff);
  } catch (err) {
    next(err);
  }
};

export default { browse };
