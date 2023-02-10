import express from "express"
import {
  createDoctor,
  addDoctor,
} from "../../controllers/adminController/addController.js"
import { dashbordController } from "../../controllers/adminController/dashbordContrller.js"
import { totalappController } from "../../controllers/adminController/totalappController.js"
import { userController } from "../../controllers/adminController/userController.js"

const router = express.Router()

router.get("/", dashbordController)
router.get("/doctor/add-doctor", createDoctor)
router.post("/doctor/add-doctor", addDoctor)
router.get("/user", userController)
router.get("/totalAppointment", totalappController)

export default router
