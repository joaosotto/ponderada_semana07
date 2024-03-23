const pool = require('../../../database/db');

class ProfessorRepository {
  // Método para buscar professor por idProfessor
  async findByIdProfessor(idProfessor) {
    // Query SQL
    const query = `SELECT * FROM users WHERE id = $1`;
    const values = [idProfessor];

    try {
      // Executar a consulta usando o pool de conexões
      const { rows } = await pool.query(query, values);

      // Verificar se há alguma aula retornada
      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error("Professor não encontrado");
      }
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  async createProfessor(data) {
    // Extrair os dados do objeto JSON data
    const { nome, email, senha, cpf, rg, id_cargo, id_ong } = data;

    // Query SQL
    const query = `INSERT INTO users (nome, email, senha, cpf, rg, id_cargo, id_ong) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    // Valores a serem inseridos na consulta SQL
    const values = [nome, email, senha, cpf, rg, id_cargo, id_ong];

    try {
      // Executar a consulta usando o pool de conexões
      await pool.query(query, values);

      return true
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  async filter(idOng){
    const query = `SELECT id, nome, email 
    FROM users 
    WHERE id_cargo = 1 AND id_ong = $1;
    `;
    const values = [idOng];

    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async updateProfessorById(id, { nome, email, cpf, rg }) {
    const query = `
    UPDATE users
    SET 
    nome = $2,
    email = $3,
    cpf = $4,
    rg = $5
    WHERE
    id = $1; 
      `;
    const values = [id, nome, email, cpf, rg];

    try {
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProfessorRepository();
