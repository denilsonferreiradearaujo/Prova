$(document).ready(async function () {
  const board = {
    "Não Iniciado": document.querySelector("#nao-iniciado"),
    "Em Desenvolvimento": document.querySelector("#em-desenvolvimento"),
    Finalizado: document.querySelector("#finalizado"),
  };
  const statusMapping = {
    "não iniciado": "Não Iniciado",
    "em desenvolvimento": "Em Desenvolvimento",
    finalizado: "Finalizado",
  };

  async function buscarTarefas() {
    Object.values(board).forEach((column) => {
      const cards = column.querySelectorAll(".card");
      cards.forEach((card) => card.remove());
    });

    try {
      const response=await axios.get(`${localStorage.getItem("ipApi")}listarTarefas`);
      const tasks = response.data.tarefas;
      console.log(response);
      console.log(tasks);

      tasks.forEach((tarefa) => {
        const mappedStatus = statusMapping[tarefa.status?.toLowerCase()];
        const column = board[mappedStatus];

        if (column) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
          <h3>Descrição: ${tarefa.descricao}</h3>
          <p>Equipe: ${tarefa.equipe}</p>
          <p>Prioridade: ${tarefa.prioridade}</p>
          <p>Vinculado à: ${tarefa.nome}</p>
          
          <div class="card-actions">
            <button class="btn-edit" onclick="carregarPagina('novaTarefa')" href = "#" data-id="${tarefa.id_tarefa}">Editar</button>
            <button class="btn-delete" data-id="${tarefa.id_tarefa}">Delete</button>
          </div>

          <div class="card-status">
            <select class="status-dropdown" data-id="${tarefa.id_tarefa}">
              <option value="Não Iniciado" ${mappedStatus === "Não Iniciado"? "selected" : ""}>Não Iniciado</option>
              <option value="Em Desenvolvimento" ${mappedStatus === "Em Desenvolvimento"? "selected" : ""}></option>
              <option value="Finalizado" ${mappedStatus === "Finalizado"? "selected" : ""}></option>
            </select>
            <button class="btn-save-status" data-id="${tarefa.id_tarefa}">Salvar</button>
          </div>
          `;
          column.appendChild(card);
        }else{
          console.log("Status desconhecido ou coluna não encontrada", tarefa.status);
        }
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  }

  await buscarTarefas();

  axios
    .get(`${localStorage.getItem("ipApi")}listarUsuarios`)
    .then((response) => {
      console.log(response.data);

      const userSelect = $("#nomeUser");
      userSelect.empty();
      userSelect.append('<option value="">Selecione um usuário</option>');

      const users = response.data.users;

      users.forEach((user) => {
        userSelect.append(
          `<option value="${user.id_usuario}">${user.nome}</option>`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });

  $(document).off("submit", "#formNovaTarefa");
  $(document).on("submit", "#formNovaTarefa", async function (event) {
    event.preventDefault();

    console.log(localStorage.getItem("ipApi"));

    const formData = {
      id_usuario: document.getElementById("nomeUser").value,
      descricao: document.getElementById("descricao").value,
      equipe: document.getElementById("equipe").value,
      prioridade: document.getElementById("prioridade").value,
    };

    axios
      .post(`${localStorage.getItem("ipApi")}novaTarefa`, formData)
      .then((response) => {
        console.log(response.data);
        alert("Tarefa Cadastrada com sucesso:", response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Ocorreu um erro ao cadastrar a tarefa: ", error);
      });
  });
});
