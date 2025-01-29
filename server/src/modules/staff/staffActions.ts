import type { RequestHandler } from "express";

import staffRepository from "./staffRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const staff = await staffRepository.readAll();

    res.json(staff);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      name: req.body.name,
      origin: req.body.origin,
      favorite_type: req.body.favorite_type,
    };

    // Create the user
    const insertId = await staffRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = req.body.auth.id;

    const affectedRows = await staffRepository.delete(id);

    if (affectedRows === 1) {
      res.status(204).json({ affectedRows });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, add, destroy };
