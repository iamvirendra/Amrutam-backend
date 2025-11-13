import express from "express";
import {
  searchDoctorsController,
  searchConsultationsController,
  searchPrescriptionsController,
  searchAuditLogsController,
} from "./search.controller.js";

const router = express.Router();

router.get("/doctors", searchDoctorsController);
router.get("/consultations", searchConsultationsController);
router.get("/prescriptions", searchPrescriptionsController);
router.get("/audit", searchAuditLogsController);

export default router;
