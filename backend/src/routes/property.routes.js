import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  deleteProperty,
  getProperties,
  getPropertyInfo,
  updateProperty,
  uploadProperty,
  userProperties,
} from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/upload").post(upload.array("images"), auth, uploadProperty);
router.route("/getall").get(getProperties);
router.route("/user-properties").get(auth, userProperties);
router.route("/info/:id").get(auth, getPropertyInfo);
router.route("/update/:id").post(auth, updateProperty);
router.route("/delete/:id").delete(auth, deleteProperty);

export default router;
