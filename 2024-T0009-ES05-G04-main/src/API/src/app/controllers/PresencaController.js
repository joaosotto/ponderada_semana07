// Importa o repositório de Presença
const PresencaRepository = require('../repositories/PresencaRepository');

class PresencaController {
  // Método para buscar presenças por ID de aula
  async getPresencasByAulaId(req, res) {
    const { idAula } = req.params;

    try {
      const presencas = await PresencaRepository.findPresencasByAulaId(
        Number(idAula)
      );
      res.json(presencas);
    } catch (error) {
      console.error('Erro ao buscar presenças:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Método para registrar presenças
  async registrarPresencas(req, res) {
    const presencas = req.body.presencas;
    try {
      const resultado = await PresencaRepository.registrarPresencas(presencas);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao registrar presenças:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new PresencaController();
