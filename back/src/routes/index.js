import { Router } from "express";
import {UsuarioController} from "../controllers/UsuarioController.js"
import {TarefaController} from "../controllers/TarefaController.js"
const router = Router();

router.post('/novoUsuario', UsuarioController.novoUsuario);
router.get('/listarUsuarios', UsuarioController.listarUsuarios);
router.post('/novaTarefa', TarefaController.novaTarefa);
router.get('/listarTarefas', TarefaController.listarTarefas);
router.put('/atualizarStatus/:id', TarefaController.atualizarStatus);
router.delete('/deletarTarefa/:id', TarefaController.deletarTarefa);
router.get('/listarTarefa/:id', TarefaController.listarTarefa);
router.put('/atualizarTarefa/:id', TarefaController.atualizarTarefa);

export default router;