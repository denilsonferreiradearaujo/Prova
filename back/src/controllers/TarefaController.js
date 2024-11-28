import Tarefa from "../models/TarefaModel.js";

export const TarefaController = {
  novaTarefa: async (req, res) => {
    try {
      const { id_usuario, descricao, equipe, prioridade } = req.body;
      const status = "NÃO INICIADO"
      const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade, status });
      // console.log(tarefa);

      const result = await tarefa.insertTarefa();
      // console.log(result);

      res.json({ result });
    } catch (error) {
      res.json({ message: error });
    }
  },

  listarUsuarios: async (req, res) => {
    try {
      const users = await Usuario.listarUsuarios();
      // console.log(users);
      res.json({ users });
    } catch (error) {
      res.json({ message: error });
    }
  },

  listarTarefas: async (req, res) => {
    try {
      const tarefas = await Tarefa.listarTarefas();
      // console.log(users);
      res.json({ tarefas });
    } catch (error) {
      res.json({ message: error });
    }
  },

  atualizarStatus: async (req, res) => {
    try {
      const {id} = req.params;
      const {status} = req.body;
      const newStatus = status.toUpperCase();
      const tarefas = await Tarefa.atualizarStatus(id, newStatus);
      res.json({ tarefas });
    } catch (error) {
      res.json({ message: error });
    }
  },

  deletarTarefa: async (req, res) => {
    try {
      const {id} = req.params;
      const tarefas = await Tarefa.deletarTarefa(id);
      // console.log("chegou aqui no tarefa controller deletar tarefa", tarefas)
      res.json({ tarefas });
    } catch (error) {
      res.json({ message: error });
    }
  },

  listarTarefa: async (req, res) => {
    console.log("Console do listar tarefa para edição");
    try {
      const {id} = req.params;
      const tarefa = await Tarefa.listarTarefa(id);
      console.log("chegou aqui no listar", tarefa);
      res.json({ tarefa });
    } catch (error) {
      res.json({ message: error });
    }
  },

  atualizarTarefa: async (req, res) => {
    console.log("Console do editar tarefa");
    try {
      const { id } = req.params;
      const { id_usuario, descricao, equipe, prioridade } = req.body;
      const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade });
      console.log("Console do atualizar tarefa",tarefa);

      const result = await tarefa.atualizarTarefa(id);
      console.log("console log do reult atualizar tarefa",result);

      res.json({ result });
    } catch (error) {
      res.json({ message: error });
    }
  },

}