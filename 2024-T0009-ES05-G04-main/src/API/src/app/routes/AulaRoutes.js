// Importa a função Router do módulo Express
const { Router } = require("express");

// Importa o controlador de Aula
const AulaController = require("../controllers/AulaController");

// Cria uma instância de Router
const router = Router();

router.get("/aulas/proximas/:idProfessor", AulaController.findByIdProfessor); // rota para buscar próximas aulas por idProfessor
router.get("/aulas/turma/:idTurma", AulaController.filterAulas); // rota para buscar aulas por turma com filtro de ocorrência
router.post('/inserir-aulas', AulaController.createAula); // Rota para criar aula
router.put('/aulas/ocorrida/:id', AulaController.updateAula); // Rota para atualizar aula
router.delete('/aulas/deletar-aula/:id', AulaController.deleteAula); // Rota para deletar aula


// Exporta o router para ser utilizado em outras partes da aplicação
module.exports = router;
