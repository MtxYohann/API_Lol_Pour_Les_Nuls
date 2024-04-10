import express from "express";
import { signin, signup } from "../controller/auth.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();
const valid = (request, response, next) => {
    const errors = validationResult(request);
        if (!errors.isEmpty()) {
     return response.status(401).json({ errors: errors.array()[0].msg });
  }
  next();
}

router.post("/signin", signin);
router.post("/signup",
    [
        body('email').isEmail().withMessage("Email invalide."),
        body('password').isStrongPassword().withMessage("Votre mot de passe n'est pas assait fort, il faut au moins 8 caracteres, une majuscule, une minuscule, un nombre, un symbol."),
        body('name').trim().notEmpty(),
        body('phoneNumber').trim().notEmpty(),
    ],
    valid,signup);

export default router;