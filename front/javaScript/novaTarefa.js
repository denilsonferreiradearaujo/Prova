$(document).ready(function () {
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
        alert('Tarefa Cadastrada com sucesso:' ,response.data)
      })
      .catch((error) => {
        console.log(error);
        alert('Ocorreu um erro ao cadastrar a tarefa: ', error);
      });
  });
});
