// Importa o módulo jwt para gerar tokens JWT
const jwt = require('jsonwebtoken');

// Importa o repositório de Usuário
const UserRepository = require('../repositories/UserRepository');

class UserController {
  // Método para lidar com o processo de login do usuário
  async login(req, res) {
    // Extrair email e senha do corpo da requisição
    const { email, senha } = req.body;

    try {
      // Tentar encontrar o usuário com as credenciais fornecidas
      const user = await UserRepository.findByCredentials(email, senha);

      // Enviar o ID do usuário, o ID do cargo e ID da ong como resposta
      res.json({ userId: user.id, roleId: user.id_cargo, ongId: user.id_ong });
    } catch (error) {
      // Se ocorrer algum erro durante o processo de login, enviar uma resposta de erro 401
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new UserController();