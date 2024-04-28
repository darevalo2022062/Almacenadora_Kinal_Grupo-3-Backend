import { Router } from "express";
import { check } from "express-validator";
import { createToDo, editToDo } from "./to-do.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarLogin } from "../middlewares/validarLogin.js";

const router = Router();

router.post('/createToDo', [
    check('nameTask', 'el nombre es obligatorio').not().isEmpty(),
    check('description', 'la descripción es obligatoria').not().isEmpty(),
    validarLogin,
    validarCampos],
    createToDo
);

router.put('/editToDo/:id', [
    // check('nameTask', 'el nombre es obligatorio').not().isEmpty(),
    validarLogin,
    validarCampos],
    editToDo
);


export default router;