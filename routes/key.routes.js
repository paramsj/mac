import {Router} from "express";

import {
    generateKey,
    getAvailable,
    getKeyInfo,
    removeKey,
    unblock,
    keepAliveKey
} from "../controllers/key.controllers.js";


const router = Router();


router.post("/keys", generateKey);

router.get("/keys", getAvailable);

router.get("/keys/:id", getKeyInfo);

router.delete("/keys/:id", removeKey);

router.put("/keys/:id", unblock);

router.put("/keepalive/:id", keepAliveKey);


export default router;