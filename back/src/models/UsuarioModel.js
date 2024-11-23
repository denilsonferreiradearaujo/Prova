import connection from "../config/db.js";

class Usuario {
  constructor(pUsuario) {
    this.nome = pUsuario.nome;
    this.email = pUsuario.email;
  }

  async insertUsuario() {
    try {
      const conn = await connection();
      // console.log('Aqui chegou algo');
      const pSql = "INSERT INTO USUARIO (NOME, EMAIL) VALUES (?, ?)";
      const pValues = [this.nome, this.email];
      const [result] = await conn.query(pSql, pValues);
    } catch (error) {
      throw error;
    }
  }

  static async listarUsuarios() {
    try {
      const conn = await connection();
      const [rows] = await conn.query(`SELECT id_usuario, nome FROM usuario;`);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Usuario;
