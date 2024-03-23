const { Router } = require('express');

// Importa o controlador de Usuário
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/login', UserController.login); // Define a rota para login de usuário

module.exports = router;