// Lógica exclusiva da tela: Negociações.
function renderDeals() {
  const list = data.deals.filter(
    (d) =>
      matches(
        `${clientById(d.clientId)?.name} ${clientById(d.clientId)?.farm} ${productById(d.product)?.name}`,
      ) &&
      (filterValue === "all" || d.product === filterValue),
  );
  document.getElementById("deal-board").innerHTML = stages
    .map(
      (stage) =>
        `<section class="kanban-column"><h2 class="kanban-header">${stage}<span>${list.filter((d) => d.stage === stage).length}</span></h2>${
          list
            .filter((d) => d.stage === stage)
            .map(
              (d) =>
                `<article class="deal-card"><span class="badge">Linha ${productById(d.product).name}</span><h3>${escapeHTML(clientById(d.clientId)?.farm)}</h3><p>${escapeHTML(clientById(d.clientId)?.name)}</p><div class="deal-value">${money(d.value)}</div><div class="deal-footer"><select data-deal-stage="${escapeHTML(d.id)}" aria-label="Etapa de ${escapeHTML(clientById(d.clientId)?.farm)}">${stages.map((s) => `<option ${s === d.stage ? "selected" : ""}>${s}</option>`).join("")}</select>${rowActions("deals", d.id)}</div></article>`,
            )
            .join("") || '<div class="empty">Nenhuma negociação<br>nesta etapa.</div>'
        }</section>`,
    )
    .join("");
}
startPage(renderDeals);

document.getElementById("deal-board").addEventListener("change", (event) => {
  const dealId = event.target.dataset.dealStage;
  if (!dealId) return;
  data.deals.find((deal) => deal.id === dealId).stage = event.target.value;
  save("Etapa da negociação atualizada.");
});
