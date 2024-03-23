// Importa classe TurmaRepository
const TurmaRepository = require('../repositories/TurmaRepository');

class TurmaController {
  // Método para buscar turmas por ID do professor
  async getByProfessorId(req, res) {
    const { idProfessor } = req.params;

    const turmas = await TurmaRepository.findByProfessorId(idProfessor);

    if (!turmas) {
      console.log('erro ao consultar turmas pelo id do professor', id);
    }

    return res.json(turmas);
  }

  async getByOficinaId(req, res) {
    const { idOficina } = req.params;

    const turmas = await TurmaRepository.findByOficinaId(Number(idOficina));

    if (!turmas) {
      console.log('erro ao consultar turmas pelo id da oficina', id);
    }

    return res.json(turmas);
  }

  async getByTurmaId(req, res) {
    const { idTurma } = req.params;

    const turma = await TurmaRepository.findByTurmaId(Number(idTurma));

    if (!turma) {
      console.log('erro ao consultar turma com o id', id);
    }

    return res.json(turma);
  }

  async createTurma(req, res) {
    const { nome, vagas, descricao_recorrencia, id_professor, id_oficina } =
      req.body;

    try {
      const turma = await TurmaRepository.create({
        nome,
        vagas,
        descricao_recorrencia,
        id_oficina,
        id_professor,
      });
      res.json({ id: turma.id, nome: turma.nome });
    } catch (error) {
      console.log('erro ao criar turma', error);
    }
  }

  async updateTurma(req, res) {
    const { id } = req.params;
    const { nome, vagas, descricao_recorrencia, id_professor } = req.body;

    try {
      const turma = await TurmaRepository.update(Number(id), {
        nome,
        vagas: Number(vagas),
        descricao_recorrencia,
        id_professor: Number(id_professor),
      });
      res.json(turma);
    } catch (error) {
      console.log('erro ao atualizar turma', error);
    }
  }
}

module.exports = new TurmaController();
