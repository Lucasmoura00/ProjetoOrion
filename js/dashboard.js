// Lógica exclusiva da tela: Visão geral.
function renderDashboard() {
  document.getElementById("today-label").textContent = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const openDeals = data.deals.filter((d) => d.stage !== "Fechado");
  const closed = data.deals.filter((d) => d.stage === "Fechado");
  const pending = data.tasks.filter((t) => !t.done).sort((a, b) => a.date.localeCompare(b.date));
  const total = (list) => list.reduce((sum, d) => sum + d.value, 0);
  const stats = [
    ["Clientes cadastrados", data.clients.length, "users", "Relacionamentos em cultivo"],
    ["Negociações abertas", openDeals.length, "chart", "Oportunidades em andamento"],
    ["Valor em negociação", money(total(openDeals)), "money", "Valores de demonstração"],
    [
      "Vendas concluídas",
      money(total(closed)),
      "check",
      `${closed.length} negociação${closed.length === 1 ? "" : "ões"} fechada${closed.length === 1 ? "" : "s"}`,
    ],
  ];
  document.getElementById("stats-list").innerHTML = stats
    .map(
      (s) =>
        `<article class="stat"><div class="stat-top">${s[0]}<span class="stat-icon">${icon(s[2])}</span></div><div class="stat-number">${s[1]}</div><div class="stat-foot">${s[3]}</div></article>`,
    )
    .join("");
  document.getElementById("pipeline-list").innerHTML = stages
    .map((stage) => {
      const list = data.deals.filter((d) => d.stage === stage);
      return `<div class="pipeline-stage"><span>${stage}</span><strong>${list.length.toString().padStart(2, "0")}</strong><small>${money(total(list))}</small></div>`;
    })
    .join("");
  document.getElementById("featured-clients").innerHTML = data.clients
    .slice(0, 4)
    .map(
      (c) =>
        `<tr><td>${clientCell(c)}</td><td>${escapeHTML(c.crop)}</td><td>${badge(c.status)}</td></tr>`,
    )
    .join("");
  document.getElementById("featured-empty").innerHTML = !data.clients.length
    ? '<div class="empty">Cadastre seu primeiro cliente.</div>'
    : "";
  document.getElementById("featured-products").innerHTML = products
    .map(
      (p) =>
        `<a class="mini-product" href="produtos.html"><img src="${p.image}" alt="Linha ${p.name}"><div><strong>${p.name}</strong><small>Tecnologia agrícola</small></div></a>`,
    )
    .join("");
  document.getElementById("pending-count").textContent =
    `${pending.length} tarefa${pending.length === 1 ? "" : "s"} para acompanhar`;
  document.getElementById("upcoming-tasks").innerHTML = taskMarkup(pending.slice(0, 3));
}
startPage(renderDashboard);
