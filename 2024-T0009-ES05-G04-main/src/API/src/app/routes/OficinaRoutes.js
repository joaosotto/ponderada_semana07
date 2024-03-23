const { Router } = require("express");

// Importa o controlador de Oficina
const OficinaController = require("../controllers/OficinaController");

const router = Router();

router.get('/oficinas/:idOng', OficinaController.getByOngId); // Rota para buscar oficinas por ID da ONG
router.get('/oficina/:idOficina', OficinaController.getByOficinaId); // Rota para buscar oficina por ID
router.post('/oficina/create', OficinaController.createOficina); // Rota para criar uma nova oficina
router.put('/oficina/update/:id', OficinaController.updateOficina); // Rota para atualizar oficina

module.exports = router;