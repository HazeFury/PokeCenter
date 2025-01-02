import express from "express";

const router = express.Router();

// ****************     STAFF ROUTES    ************************
import staffActions from "./modules/staff/staffActions";

router.get("/api/staff", staffActions.browse);

/* ************************************************************************* */
export default router;
