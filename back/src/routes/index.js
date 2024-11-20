import { Router } from "express";
import {UsuarioController} from "../controllers/UsuarioController.js"

const router = Router();

router.post('/novoUsuario', UsuarioController.novoUsuario);


export default router;