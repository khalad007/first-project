import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";

const router = Router();


router.use("/users", UserRouter);
router.use("/students", StudentRoutes);

export default router;
