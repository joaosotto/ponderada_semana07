const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();

describe("GET /aulas/proximas/:idProfessor", () => {
  it("deve retornar 200", (done) => {
    request(process.env.API_URL)
      .get("/aulas/proximas/1")
      .expect(200)
      .then((response) => {
        response.body.forEach((item) => {
          expect(typeof item.data).toBe("string");
          expect(item.ocorrida).toBe(false);
          expect(typeof item.id_turma).toBe("number");
        });
        done();
      })
      .catch((error) => done(error));
  });
});
