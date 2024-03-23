const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.API_URL);

const express = require("express");

// Importa o middleware CORS personalizado
// const cors = require("./app/middlewares/cors");

// Importa os arquivos de rotas para diferentes recursos da aplicação
const UserRoutes = require("./app/routes/UserRoutes");
const AlunoRoutes = require("./app/routes/AlunoRoutes");
const OficinaRoutes = require("./app/routes/OficinaRoutes");
const TurmaRoutes = require("./app/routes/TurmaRoutes");
const AulaRoutes = require("./app/routes/AulaRoutes");
const PresencaRoutes = require("./app/routes/PresencaRoutes");
const ProfessorRoutes = require("./app/routes/ProfessorRoutes");

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Middleware CORS para permitir requisições de diferentes origens
// app.use(cors);

// Define as rotas para os diferentes recursos da aplicação
app.use(UserRoutes);
app.use(AlunoRoutes);
app.use(OficinaRoutes);
app.use(TurmaRoutes);
app.use(AulaRoutes);
app.use(PresencaRoutes);
app.use(ProfessorRoutes);

// O servidor escuta na porta 5500
app.listen(process.env.PORT, () =>
  console.log(`Servidor iniciado na ${process.env.API_URL}`)
);
