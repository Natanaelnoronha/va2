// Referências aos elementos do DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Carregar as tarefas salvas no LocalStorage ao carregar a página
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Evento para adicionar nova tarefa
addTaskButton.addEventListener("click", () => {
    const textoTarefa = taskInput.value.trim();
    if (textoTarefa !== "") {
        adicionarTarefa(textoTarefa);
        salvarTarefaNoLocalStorage(textoTarefa);
        taskInput.value = ""; // Limpa o campo de entrada
    }
});

// Função para adicionar tarefa à interface
function adicionarTarefa(textoTarefa) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        <span>${textoTarefa}</span>
        <i class="delete-btn bi bi-trash-fill">🗑️</i>
    `;
    taskList.appendChild(li);

    // Adiciona funcionalidade de excluir tarefa
    li.querySelector(".delete-btn").addEventListener("click", () => {
        removerTarefa(textoTarefa);
        li.remove();
    });
}

// Função para salvar tarefa no LocalStorage
function salvarTarefaNoLocalStorage(textoTarefa) {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.push(textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para obter tarefas do LocalStorage
function obterTarefasDoLocalStorage() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

// Função para carregar tarefas do LocalStorage
function carregarTarefas() {
    const tarefas = obterTarefasDoLocalStorage();
    tarefas.forEach(textoTarefa => adicionarTarefa(textoTarefa));
}

// Função para remover tarefa do LocalStorage
function removerTarefa(textoTarefa) {
    let tarefas = obterTarefasDoLocalStorage();
    tarefas = tarefas.filter(tarefa => tarefa !== textoTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
