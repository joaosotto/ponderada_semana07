const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();

describe("GET /aulas/proximas/:idProfessor", () => {
  it("deve retornar 200", () => {
    request(process.env.API_URL)
      .get("/aulas/proximas/1")
      .expect(200)
      .then((response) => {
        expect(response.body.data).toContain("2024");
        expect(response.body.duracao).toBeLessThanOrEqual(3);
        expect(response.body.id_turma).to.be.a("number");
      });
  });
});
