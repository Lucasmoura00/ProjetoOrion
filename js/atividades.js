// Lógica exclusiva da tela: Atividades.
function renderTasks() {
  const list = data.tasks
    .filter(
      (t) =>
        matches(
          `${t.title} ${clientById(t.clientId)?.name || ""} ${clientById(t.clientId)?.farm || ""}`,
        ) &&
        (filterValue === "all" || (filterValue === "done" ? t.done : !t.done)),
    )
    .sort((a, b) => Number(a.done) - Number(b.done) || a.date.localeCompare(b.date));
  document.getElementById("task-count").textContent = `${list.length} atividade(s)`;
  document.getElementById("task-list").innerHTML = taskMarkup(list, true);
}
startPage(renderTasks);
