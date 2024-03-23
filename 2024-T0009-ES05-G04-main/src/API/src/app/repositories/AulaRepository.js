const pool = require("../../../database/db");

class AulaRepository {
  // Método para buscar aulas por idProfessor
  async findByIdProfessor(idProfessor) {
    // Query SQL que busca as aulas de um professor que ainda não ocorreram
    const query = `SELECT aulas.*, turmas.nome AS nome_turma, oficinas.nome AS nome_oficina FROM aulas JOIN turmas ON aulas.id_turma = turmas.id JOIN oficinas ON turmas.id_oficina = oficinas.id WHERE turmas.id_professor = $1 AND aulas.ocorrida = false ORDER BY data;`;
    const values = [idProfessor];

    try {
      // Executar a consulta usando o pool de conexões
      const { rows } = await pool.query(query, values);

      // Verificar se há alguma aula retornada
      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error("Aulas não encontradas");
      }
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  // Método para buscar aulas por idTurma
  async filter(ocorrida, idTurma) {
    // Query SQL que busca as aulas de uma turma que já ocorreram ou não
    const query = `SELECT * FROM aulas WHERE aulas.ocorrida = $1 AND id_turma = $2 ORDER BY data;`;
    const values = [ocorrida, idTurma];

    try {
      // Executar a consulta usando o pool de conexões
      const { rows } = await pool.query(query, values);

      // Verificar se há alguma aula retornada
      if (rows.length > 0) {
        return rows;
      } else {
        throw new Error("Aulas não encontradas");
      }
    } catch (error) {
      throw error; // Lançar qualquer erro encontrado durante a execução da consulta
    }
  }

  // Método para criar aulas
  async create(dados) {
    // Query SQL para inserir novas aulas
    const queryPrefix = `INSERT INTO aulas (data, duracao, id_turma) VALUES`;
    const values = [];
    const rows = dados
      .map((aula) => {
        values.push(aula.data, aula.duracao, aula.id_turma);
        return `($${values.length - 2}, $${values.length - 1}, $${
          values.length
        })`;
      })
      .join(", ");

    const query = `${queryPrefix} ${rows};`;

    try {
      // Executar a consulta usando o pool de conexões
      await pool.query(query, values);
      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao criar aulas:", error); // Lançar qualquer erro encontrado durante a execução da consulta
      return { sucesso: false, erro: error };
    }
  }

  // Método para atualizar aulas
  async update(idAula) {
    // Query SQL para atualizar aulas
    const query = `UPDATE aulas SET ocorrida = true WHERE id = $1;`;
    const values = [idAula];

    try {
      // Executar a consulta usando o pool de conexões
      await pool.query(query, values);
      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao atualizar aula:", error); // Lançar qualquer erro encontrado durante a execução da consulta
      return { sucesso: false };
    }
  }

  // Método para deletar aulas
  async delete(idAula) {
    // Query SQL para deletar aulas
    const query = `DELETE FROM aulas WHERE  id = $1;`;
    const values = [idAula];

    try {
      // Executar a consulta usando o pool de conexões
      await pool.query(query, values);
      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao deletar aula:", error); // Lançar qualquer erro encontrado durante a execução da consulta
      return { sucesso: false };
    }
  }
}

module.exports = new AulaRepository();
