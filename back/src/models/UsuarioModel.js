import connection from "../config/db.js";

class Usuario{
    constructor(pUsuario){
        this.nome = pUsuario.nome;
        this.email = pUsuario.email;
    }

    async insertUsuario(){
        try {
            const conn = await connection();
            // console.log('Aqui chegou algo');
            const pSql = 'INSERT INTO USUARIO (NOME, EMAIL) VALUES (?, ?)';
            const pValues = [this.nome, this.email];
            const [result] = await conn.query(pSql, pValues);
        } catch (error) {
            throw error;
        }finally{
            await conn.release();
        }
    }
}

export default Usuario;