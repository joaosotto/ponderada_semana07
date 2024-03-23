// Importa o repositório de Aula
const ProfessorRepository = require("../repositories/ProfessorRepository");

class ProfessorController {
  async getByIdProfessor(req, res) {
    const { idProfessor } = req.params;

    try {
      const detalhesProfessor = await ProfessorRepository.findByIdProfessor(
        Number(idProfessor)
      );
      res.json(detalhesProfessor);
    } catch (error) {
      console.log("Erro ao buscar professor: ", error);
      res.status(500).json({ error: "erro interno do servidor" });
    }
  }

  async createProfessor(req, res) {
    const data = req.body;

    try {
      const novoProfessor = await ProfessorRepository.createProfessor(data);
      res.json(novoProfessor);
      res.status(200);
    } catch (error) {
      console.log("Erro ao cadastrar professor: ", error);
      res.status(500).json({ error: "erro interno do servidor" });
    }
  }

  async getByOngId(req, res) {
    const { idOng } = req.params;

    console.log(idOng);
    try {
      const professores = await ProfessorRepository.filter(Number(idOng));
      res.json(professores);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      res.status(500).json({ error: "Erro ao buscar professores" });
    }
  }

  async updateProfessorById(req, res) {
    const { id } = req.params;
    const { nome, email, cpf, rg } = req.body;

    try {
      const professorAtualizado = await ProfessorRepository.updateProfessorById(
        Number(id),
        {
          nome,
          email,
          cpf,
          rg,
        }
      );
      res.json(professorAtualizado);
    } catch (error) {
      console.log("Erro ao atualizar o professor com id", id, error);
      res.status(400).json({ erro: error.toString() });
    }
  }
}

module.exports = new ProfessorController();
