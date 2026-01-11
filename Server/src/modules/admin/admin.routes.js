import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import authorizationMiddleware from "../../middlewares/authorization.js";

const adminRouter = Router();

// adminRouter.use(authMiddleware);
// adminRouter.use(authorizationMiddleware);

adminRouter.get("/", authMiddleware, authorizationMiddleware, (req, res) => {
    return res.json({
        message: "Admin route called "
    })
})

export default adminRouter;