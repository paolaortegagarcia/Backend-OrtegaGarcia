import { Router } from "express";
import { fork } from "child_process";
import path from "path";
import { __dirname } from "../../utils/utils.js";

const router = Router();

const scriptPath = path.resolve(__dirname, "./utils.js");

let visitas = 0;

router.get("/", (req, res) => {
    visitas += 1;
    res.json({
        mensage: "Servidor No Bloqueante",
        visitas,
    });
});

router.get("/calculo", (req, res) => {
    const computo = fork(scriptPath);
    computo.send("start");
    computo.on("message", (sum) => {
        res.json({
            resultado: sum,
        });
    });
});

export default router;
