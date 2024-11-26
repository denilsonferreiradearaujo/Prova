import connection from "../config/db.js";

class Tarefa {
  constructor(pTarefa) {
    this.id_usuario = pTarefa.id_usuario;
    this.descricao = pTarefa.descricao;
    this.equipe = pTarefa.equipe;
    this.prioridade = pTarefa.prioridade;
    this.status = pTarefa.status;
  }

  async insertTarefa() {
    try {
      const conn = await connection();
      const pSql =
        "INSERT INTO TAREFA (ID_USUARIO, DESCRICAO, EQUIPE, PRIORIDADE, STATUS) VALUES (?, ?, ?, ?, ?)";
      const pValues = [
        this.id_usuario,
        this.descricao,
        this.equipe,
        this.prioridade,
        this.status,
      ];
      const [result] = await conn.query(pSql, pValues);
      console.log(result);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async listarTarefas() {
    try {
      const conn = await connection();
      const [rows] =
        await conn.query(`SELECT T.id_tarefa, T.id_usuario, T.descricao, T.equipe, T.prioridade, T.data_cadastro, T.status, U.nome 
        FROM TAREFA T 
        INNER JOIN USUARIO U 
        ON T.id_usuario = U.id_usuario;`);
        console.log(rows);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Tarefa;
