// Lógica exclusiva da tela: Clientes.
function renderClients() {
  const list = data.clients.filter(
    (c) =>
      matches(`${c.name} ${c.farm} ${c.city} ${c.crop}`) &&
      (filterValue === "all" || c.status === filterValue),
  );
  document.getElementById("client-rows").innerHTML = list
    .map(
      (c) =>
        `<tr><td>${clientCell(c)}</td><td>${escapeHTML(c.city)}</td><td><div class="client-cell"><div><strong>${escapeHTML(c.phone || "Não informado")}</strong><small>${escapeHTML(c.email)}</small></div></div></td><td>${escapeHTML(c.crop)}</td><td>${badge(c.status)}</td><td>${rowActions("clients", c.id)}</td></tr>`,
    )
    .join("");
  document.getElementById("result-count").textContent = `${list.length} registro(s)`;
  document.getElementById("clients-empty").hidden = list.length > 0;
}
startPage(renderClients);
