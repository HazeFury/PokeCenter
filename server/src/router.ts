import express from "express";

const router = express.Router();

// ****************     STAFF ROUTES    ************************
import staffActions from "./modules/staff/staffActions";

router.get("/api/staff", staffActions.browse);

/* ************************************************************************* */

// ****************     POKEMON-HEAL ROUTES    ************************
import pokemonHealActions from "./modules/pokemonHeal/pokemonHealActions";

router.get("/api/pokemon-to-heal", pokemonHealActions.browse);
router.post("/api/new-pokemon-to-heal", pokemonHealActions.add);
router.put("/api/heal-pokemon/:id", pokemonHealActions.edit);

/* ************************************************************************* */

// ****************     POKEDEX ROUTES    ************************
import pokedexActions from "./modules/pokedex/pokedexActions";

router.get("/api/pokedex", pokedexActions.browse);

/* ************************************************************************* */
export default router;
