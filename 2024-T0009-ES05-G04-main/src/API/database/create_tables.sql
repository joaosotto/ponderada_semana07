DROP TABLE IF EXISTS presencas CASCADE;

DROP TABLE IF EXISTS turmas_alunos CASCADE;

DROP TABLE IF EXISTS ongs_alunos CASCADE;

DROP TABLE IF EXISTS aulas CASCADE;

DROP TABLE IF EXISTS turmas CASCADE;

DROP TABLE IF EXISTS oficinas CASCADE;

DROP TABLE IF EXISTS alunos CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS ongs CASCADE;

DROP TABLE IF EXISTS cargos CASCADE;

CREATE TABLE cargos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE ongs (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    bairro VARCHAR(255),
    numero VARCHAR(50),
    cidade VARCHAR(100),
    estado VARCHAR(100)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) UNIQUE NOT NULL,
    rg VARCHAR(20),
    id_cargo INTEGER NOT NULL REFERENCES cargos(id),
    id_ong INTEGER REFERENCES ongs(id)
);

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    estado_civil VARCHAR(50) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    telefone VARCHAR(25),
    celular VARCHAR(25),
    raca VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    data_nasc TIMESTAMP NOT NULL,
    responsavel VARCHAR(255)
);

CREATE TABLE oficinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(255),
    subcategoria VARCHAR(255),
    local VARCHAR(255),
    observacoes TEXT,
    id_ong INTEGER NOT NULL REFERENCES ongs(id)
);

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    vagas INTEGER NOT NULL,
    descricao_recorrencia TEXT,
    id_oficina INTEGER NOT NULL REFERENCES oficinas(id),
    id_professor INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    data TIMESTAMP NOT NULL,
    duracao INTEGER NOT NULL,
    ocorrida BOOLEAN NOT NULL DEFAULT FALSE,
    id_turma INTEGER NOT NULL REFERENCES turmas(id)
);

CREATE TABLE presencas (
    id SERIAL PRIMARY KEY,
    presente BOOLEAN NOT NULL,
    id_aluno INTEGER NOT NULL REFERENCES alunos(id),
    id_aula INTEGER NOT NULL REFERENCES aulas(id)
);

CREATE TABLE turmas_alunos (
    id_aluno INTEGER NOT NULL REFERENCES alunos(id),
    id_turma INTEGER NOT NULL REFERENCES turmas(id),
    PRIMARY KEY (id_aluno, id_turma)
);

CREATE TABLE ongs_alunos (
    id_aluno INTEGER NOT NULL REFERENCES alunos(id),
    id_ong INTEGER NOT NULL REFERENCES ongs(id),
    PRIMARY KEY (id_aluno, id_ong)
);