const pool = require('../../../database/db');

class TurmaRepository {
  // Método para buscar turmas por ID do professor
  async findByProfessorId(idProfessor) {
    const query = `
    SELECT turmas.*, oficinas.nome AS nome_oficina
FROM turmas
JOIN oficinas ON turmas.id_oficina = oficinas.id
WHERE turmas.id_professor = $1;
    `;
    const value = [idProfessor];

    try {
      const { rows } = await pool.query(query, value);

      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error('Turmas não encontradas');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByOficinaId(idOficina) {
    const query = `SELECT id, nome, descricao_recorrencia, id_oficina 
    FROM turmas 
    WHERE turmas.id_oficina = $1`;

    const value = [idOficina];

    try {
      const { rows } = await pool.query(query, value);

      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error('Turmas não encontradas');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByTurmaId(idTurma) {
    const query = `SELECT * 
    FROM turmas 
    WHERE turmas.id = $1`;

    const value = [idTurma];

    try {
      const { rows } = await pool.query(query, value);

      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error('Turma não encontrada');
      }
    } catch (error) {
      throw error;
    }
  }

  async create({
    nome,
    vagas,
    descricao_recorrencia,
    id_oficina,
    id_professor,
  }) {
    const query = `INSERT INTO turmas (nome, vagas, descricao_recorrencia, id_oficina, id_professor)
    VALUES ($1, $2, $3, $4, $5) RETURNING id, nome;`;

    try {
      const { rows } = await pool.query(query, [
        nome,
        vagas,
        descricao_recorrencia,
        id_oficina,
        id_professor
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id, { nome, vagas, descricao_recorrencia, id_professor }) {
    const query = `UPDATE turmas
    SET nome = $1, vagas = $2, descricao_recorrencia = $3, id_professor = $4
    WHERE id = $5 
    RETURNING *;`;
    const values = [nome, vagas, descricao_recorrencia, id_professor, id];

    try {
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TurmaRepository();
