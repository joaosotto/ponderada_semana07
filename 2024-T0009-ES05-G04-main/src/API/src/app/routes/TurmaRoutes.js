const { Router } = require("express");

// Importa o controlador de Turma
const TurmaController = require("../controllers/TurmaController");

const router = Router();

// Define a rota para buscar turmas por ID do professor
router.get("/turmas/:idProfessor", TurmaController.getByProfessorId); // Rota para buscar turmas por ID do professor
router.get("/oficina/:idOficina/turmas", TurmaController.getByOficinaId); // Rota para buscar turmas por ID da oficina
router.get("/oficina/turma/:idTurma", TurmaController.getByTurmaId); // Rota para buscar turma por ID
router.post('/turma/create', TurmaController.createTurma); // Rota para criar uma nova turma
router.put('/turma/update/:id', TurmaController.updateTurma); // Rota para atualizar turma


module.exports = router;
