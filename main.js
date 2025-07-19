document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const tarefaInput = document.getElementById("tarefa");
  const tarefaHolder = document.getElementById("tarefaHolder");

  function adicionarTarefaNaTela(tarefa) {
    const div = document.createElement("div");
    div.className = "tarefa";

    const texto = document.createElement("span");
    texto.innerText = tarefa.texto;

    const btn = document.createElement("button");
    btn.innerText = "Apagar";
    btn.onclick = () => {
      fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
        method: "DELETE",
      }).then(() => {
        div.remove();
      });
    };

    div.appendChild(texto);
    div.appendChild(btn);
    tarefaHolder.appendChild(div);
  }

  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((tarefas) => {
      tarefas.forEach(adicionarTarefaNaTela);
    });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const novaTarefa = {
      texto: tarefaInput.value,
    };

    fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaTarefa),
    })
      .then((res) => res.json())
      .then((tarefaSalva) => {
        adicionarTarefaNaTela(tarefaSalva);
        tarefaInput.value = "";
      });
  });
});
