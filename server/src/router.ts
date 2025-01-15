import express from "express";

const router = express.Router();

// ****************     STAFF ROUTES    ************************
import authActions from "./modules/auth/authActions";
import staffActions from "./modules/staff/staffActions";

router.get("/api/staff", staffActions.browse);

router.post("/api/login", authActions.login);

router.post("/api/new-staff", authActions.hashPassword, staffActions.add);

/* ************************************************************************* */

// ****************     POKEMON-HEAL ROUTES    ************************
import pokemonHealActions from "./modules/pokemonHeal/pokemonHealActions";

router.get("/api/pokemon-to-heal", pokemonHealActions.browse);
router.post("/api/new-pokemon-to-heal", pokemonHealActions.add);
router.put(
  "/api/heal-pokemon/:id",
  authActions.verifyToken,
  pokemonHealActions.edit,
);

/* ************************************************************************* */

// ****************     POKEDEX ROUTES    ************************
import pokedexActions from "./modules/pokedex/pokedexActions";

router.get("/api/pokedex", pokedexActions.browse);

/* ************************************************************************* */

export default router;
