import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRouter } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
