// Importa o repositório de Aula
const AulaRepository = require("../repositories/AulaRepository");

class AulaController {
  
  async findByIdProfessor(req, res) {
    const { idProfessor } = req.params;

    try {
      const proximasAulas = await AulaRepository.findByIdProfessor(
        Number(idProfessor)
      );
      res.json(proximasAulas);
    } catch (error) {
      res.status(500).json({ error: "erro interno do servidor" });
    }
  }

  async filterAulas(req, res) {
    const ocorrida = req.query.ocorrida;
    const { idTurma } = Number(req.params);
      try {
        if(ocorrida !== 'true' && ocorrida !== 'false'){
          res.status(400).json({ error: "Parâmetro 'ocorrida' inválido" });
        }
        const aulas = await AulaRepository.filter(ocorrida, idTurma);
        res.json(aulas);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
        res.status(500).json({ error: "Erro ao buscar aulas" });
      }
  }

  async createAula(req, res) {
    const  dados  = req.body;

    try {
          const resultado = await AulaRepository.create(dados);
          
          if(resultado.sucesso){
            res.status(201).json({message: "Aulas criada com sucesso"});
          }
    } catch (error) {
      console.error("Erro ao criar aula:", error);
      res.status(500).json({ error: "Erro ao criar aulas" });
    }
  }

  async filterAulas(req, res) {
    const ocorrida = req.query.ocorrida;
    const { idTurma } = req.params;

      try {
        if(ocorrida !== 'true' && ocorrida !== 'false'){
          res.status(400).json({ error: "Parâmetro 'ocorrida' inválido" });
        }
        const aulas = await AulaRepository.filter(ocorrida, idTurma);
        res.json(aulas);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
        res.status(500).json({ error: "Erro ao buscar aulas" });
      }
  }
  
  async updateAula(req, res) {
    const { id } = req.params;

    try {
      const resultado = await AulaRepository.update(id);

      if(resultado.sucesso){
        res.status(200).json({message: "Aula atualizada com sucesso"});
      }
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      res.status(500).json({ error: "Erro ao atualizar aula" });
    
  }
}
  async deleteAula(req, res){
    const { id } = req.params;
    
    try {
      const resultado = await AulaRepository.delete(id);

      if(resultado.sucesso){
        res.status(200).json({message: "Aula deletada com sucesso"});
      }
    } catch (error) {
      console.error("Erro ao deletar aula:", error);
      res.status(500).json({ error: "Erro ao deletar aula" });
    }
  }
}

module.exports = new AulaController();
