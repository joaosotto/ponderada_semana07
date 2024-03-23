// importa o repositório da oficina
const OficinaRepository = require('../repositories/OficinaRepository');

class OficinaController {
  // Método para buscar oficinas por ID da ONG
  async getByOngId(req, res) {
    const { idOng } = req.params;

    try {
      const oficinas = await OficinaRepository.findByOngId(Number(idOng));
      res.json(oficinas);
    } catch (error) {
      console.log(
        'Erro ao consultar as oficinas da ong com id passado',
        idOng,
        error
      );
    }
  }

  // Método para buscar oficina por ID
  async getByOficinaId(req, res) {
    const { idOficina } = req.params;

    try {
      const oficina = await OficinaRepository.findByOficinaId(Number(idOficina));
      res.json(oficina);
    } catch (error) {
      console.log(
        'Erro ao consultar a oficina com o id:',
        idOficina,
        error
      );
    }
  }

  // Método para criar uma nova oficina
  async createOficina(req, res) {
    const { nome, categoria, subcategoria, local, observacoes, id_ong } = req.body;

    try {
        const id = await OficinaRepository.create([nome, categoria, subcategoria, local, observacoes, id_ong]);
        res.json({ id });
    } catch (error) {
        console.log('erro ao criar oficina', error);
        res.status(500).send('Erro ao criar oficina');
    }
}

  // Método para atualizar oficina
  async updateOficina(req, res) {
    const { id } = req.params;
    const { nome, categoria, subcategoria, local, observacoes } = req.body;

    try {
      const oficiAtualizada = await OficinaRepository.update(Number(id), {
        nome,
        categoria,
        subcategoria,
        local,
        observacoes,
      });
      res.json(oficiAtualizada);
    } catch (error) {
      console.log('Erro ao atualizar a oficina com id', id, error);
      res.status(400).json({ erro: error.toString() });
    }
  }
}

module.exports = new OficinaController();
