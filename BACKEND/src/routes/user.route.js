import {Router} from "express"
import {
    signupPlayer,
    loginPlayer,
    logoutPlayer,
    getPlayerDetails,
    getAllPlayers,
    getCurrentPlayer,
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupPlayer)
router.route("/login").post(loginPlayer)
router.route("/logout").post(verifyJWT,logoutPlayer)

router.route("/getPlayerDetails").post( verifyJWT,getPlayerDetails)
router.route("/getAllPlayers").get( getAllPlayers)
router.route("/getCurrentPlayers").get( verifyJWT, getCurrentPlayer)





export default router