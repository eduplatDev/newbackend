import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  registerUser,
  verifyEmail,
  veryfyUsername,
  verifyUser,
} from '../controllers/user.controller.js';

const router = Router();

// TODO: AQUI LAS RUTAS QUE NO REQUIRAN DE AUTENTICACION
// COMO EL REGISTER, LOGIN, VERIFICATION EMAIL, FORGOT PASSWORD, ETC

router.post('/register', registerUser);

router.get('/verifyUsername', veryfyUsername);

router.get('/verifyEmail', verifyEmail);

router.post('/user/verify/:token', verifyUser);

router.use(authRequired);

// TODO: AQUI LAS RUTAS QUE REQUIERAN DE AUTENTICACION

export default router;
