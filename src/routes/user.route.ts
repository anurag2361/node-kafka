import { Request, Response, Router } from "express";
import { User } from "../models/user.model";
const router = Router();

// create user
router.post("/create", async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const user = new User({
            name,
        });
        const userDoc = await user.save();
        res.send(userDoc);
    } catch (error) {
        throw new Error(error);
    }
});

export const UserRouter = router;