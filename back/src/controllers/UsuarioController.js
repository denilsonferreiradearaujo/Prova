import Usuario from "../models/UsuarioModel.js"

export const UsuarioController = {
    novoUsuario: async (req, res) => {
        try{
            const {nome, email} = req.body;
            const usuario = new Usuario({ nome, email });
            console.log(usuario);
            const result = await usuario.insertUsuario();
            res.json({ result });
        }catch (error) {
            res.json({message: error})
        }
    }
}