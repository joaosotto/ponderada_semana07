const pool = require('../../../database/db');

class OficinaRepository {
  // Método para buscar oficinas por ID de ong
  async findByOngId(ongId) {
    // Query SQL para buscar oficinas com o id da ong fornecido
    const query = `SELECT oficinas.id, oficinas.nome, oficinas.categoria
    FROM oficinas
    WHERE oficinas.id_ong = $1;
    `;

    const values = [ongId];

    try {
      // Executar a consulta usando o pool de conexões
      const { rows } = await pool.query(query, values);
      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error('Oficinas não encontradas');
      }
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  async findByOficinaId(oficinaId) {
    const query = `SELECT *
      FROM  oficinas WHERE id = $1;`;

    const values = [oficinaId];

    try {
      const { rows } = await pool.query(query, values);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error('Oficinas não encontradas');
      }
    } catch (error) {
      throw error;
    }
  }

  async create(values) {
    const query = `INSERT INTO oficinas (nome, categoria, subcategoria, local, observacoes, id_ong)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id, { nome, categoria, subcategoria, local, observacoes }) {
    const query = `UPDATE oficinas
      SET nome = $1, categoria = $2, subcategoria = $3, local = $4, observacoes = $5
      WHERE id = $6
      RETURNING *;
      `;
    const values = [nome, categoria, subcategoria, local, observacoes, id];

    try {
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OficinaRepository();
