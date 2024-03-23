// importa classe AlunoRepository
const AlunoRepository = require('../repositories/AlunoRepository');

class AlunoController {
  // findByTurma retorna alunos inscritos de uma turma
  async findByTurma(req, res) {
    const { idTurma } = req.params; 
    try {
      const alunos = await AlunoRepository.findByTurma(idTurma);
      res.send(alunos);
    } catch (error) {
      console.log('Erro ao consultar alunos de uma turma: ', error);
      res.status(500).send('Erro ao consultar alunos de uma turma');
    }
  }

  // findByTurma retorna alunos inscritos de uma ong
  async findByOng(req, res) {
    const { idOng } = req.params; 
    try {
      const alunos = await AlunoRepository.findByOng(idOng);
      res.send(alunos);
    } catch (error) {
      console.log('Erro ao consultar alunos de uma ong: ', error);
      res.status(500).send('Erro ao consultar alunos de uma ong');
    }
  }

  // findByNotInTurma para buscar alunos não inscritos em uma turma específica
  async findByNotInTurma(req, res) {
    const idOng = Number(req.params.idOng);
    const idTurma = Number(req.params.idTurma);
    try {
      const alunosNaoInscritos = await AlunoRepository.findByNotInTurma(
        idOng,
        idTurma
      );
      res.send(alunosNaoInscritos);
    } catch (error) {
      console.log(
        'Erro ao consultar alunos não inscritos em uma turma: ',
        error
      );
      res.status(400).send(error);
    }
  }

  // create cria um aluno com os dados passados
  async create(req, res) {
    const data = req.body;
    try {
      const novo_aluno = await AlunoRepository.create(data);
      res.send(novo_aluno);
    } catch (error) {
      console.log('Erro ao criar aluno: ', error);
    }
  }

  // Adiciona um aluno a uma turma
  async addToTurma(req, res) {
    const id_aluno = Number(req.body.id_aluno);
    const id_turma = Number(req.body.id_turma);

    try {
      const alunoAtualizado = await AlunoRepository.addToTurma(
        id_aluno,
        id_turma
      );
      res.status(200).json(alunoAtualizado);
    } catch (error) {
      console.log('Erro ao adicionar aluno a turma: ', error);
      res.status(400).json({ erro: error.toString() });
    }
  }

  // Adiciona um aluno a uma ong
  async addToOng(req, res) {
    const id_aluno = req.body.id_aluno;
    const id_ong = req.body.id_ong;

    try {
      const alunoAtualizado = await AlunoRepository.addToOng(
        id_aluno,
        id_ong
      );
      res.status(200).json(alunoAtualizado);
    } catch (error) {
      console.log('Erro ao adicionar aluno a ong: ', error);
      res.status(400).json({ erro: error.toString() });
    }
  }

  // Remove um aluno de uma turma
  async removeFromTurma(req, res) {
    const id_aluno = req.body.id_aluno;
    const id_turma = req.body.id_turma;

    try {
      const alunoAtualizado = await AlunoRepository.removeFromTurma(
        id_aluno,
        id_turma
      );
      res.status(200).json(alunoAtualizado);
    } catch (error) {
      console.log('Erro ao remover aluno da turma: ', error);
      res.status(400).json({ erro: error.toString() });
    }
  }
}

module.exports = new AlunoController();
