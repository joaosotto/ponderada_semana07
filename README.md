# ponderada_semana07

# ponderada_semana07

### 1 - Login

#### Pré-condição:

- O servidor backend rodando.

- Um usuário deve estar cadastrado no sistema como professor.

- Deve existir ao menos uma aula em pelo menos uma turma em que um professor esteja dando aulas.

#### Procedimento de Teste:

Utilizando as libs 'jest' e 'supertest', criamos um teste de integração na rota '/aulas/proximas/:idProfessor'.
No arquivo 'aulas-proximas-idProfessor.test.js' temos o código de teste.
Para rodar o teste usamos 'npm teste', e a lib jest executa todos os arquivos .test que encontrar.

#### Pós-condição:

A resposta do teste deve ser retornado ao usuário pelo terminal.

#### Resultados Esperados:

Deve retornar 1 teste executado e com sucesso.

#### Resultados obtidos:

A rota /aulas/proximas/:idProfessor passou no teste.

![alt text](image-1.png)

#### Análise dos Resultados:

A rota foi testada e respondeu como esperado. Isso indica que o backend dessa funcionalidade esta funcional e com a integridade dos dados garantida.
