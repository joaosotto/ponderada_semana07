// Importa a função Router do módulo Express
const { Router } = require("express");

// Importa o controlador de Aula
const ProfessorController = require("../controllers/ProfessorController");

// Cria uma instância de Router
const router = Router();

router.get("/professor/:idProfessor", ProfessorController.getByIdProfessor); //professor pelo id
router.post("/professor", ProfessorController.createProfessor); //cadastrar professor
router.get("/professores/ong/:idOng", ProfessorController.getByOngId); //professores pela ong
router.post(
  "/atualizar-professor/:id",
  ProfessorController.updateProfessorById
); //editar professor por id

// Exporta o router para ser utilizado em outras partes da aplicação
module.exports = router;
