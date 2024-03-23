const pool = require('../../../database/db');

class PresencaRepository {
  // Método para buscar presenças por ID de aula
  async findPresencasByAulaId(idAula) {
    // Query SQL para buscar presenças por ID de aula
    const query = `
        SELECT presencas.*, alunos.nome
        FROM presencas
        JOIN alunos ON presencas.id_aluno = alunos.id
        WHERE presencas.id_aula = $1;
      `;
    const values = [idAula];

    try {
      // Executar a consulta usando o pool de conexões
      const { rows } = await pool.query(query, values);

      // Verificar se foram encontrados registros de presença
      if (rows.length > 0) {
        return rows; // Retorna todos os registros de presença encontrados
      } else {
        throw new Error('Nenhuma presença encontrada para a aula informada.');
      }
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  async registrarPresencas(presencas) {
    const queryPrefix = `INSERT INTO presencas (id_aula, id_aluno, presente) VALUES`;
    const values = [];
    const rows = presencas
      .map((presenca) => {
        values.push(presenca.idAula, presenca.idAluno, presenca.presente);
        return `($${values.length - 2}, $${values.length - 1}, $${
          values.length
        })`;
      })
      .join(', ');

    const query = `${queryPrefix} ${rows};`;

    try {
      await pool.query(query, values);
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao registrar presenças:', error);
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }
}

module.exports = new PresencaRepository();
