module.exports = (request, response, next) => {
     // Define o cabeçalho Access-Control-Allow-Origin para permitir requisições da origem específica
    response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    // Define os métodos HTTP permitidos
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Define os cabeçalhos permitidos na requisição
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};