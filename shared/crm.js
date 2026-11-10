/* Orion CRM: JavaScript puro. Os dados são demonstrativos e ficam neste navegador. */
const STORAGE_KEY = "orion-crm-v1";
const stages = ["Novo contato", "Em atendimento", "Proposta enviada", "Fechado"];
const products = [
  {
    id: "target",
    name: "Target",
    image: "assets/crm/target.webp",
    label: "LINHA TARGET",
    description:
      "Uma das linhas de equipamentos apresentada pela Orion para seu portfólio de tecnologia agrícola.",
    source: "https://orion.ind.br/products?model=target",
  },
  {
    id: "hunter",
    name: "Hunter",
    image: "assets/crm/hunter.webp",
    label: "LINHA HUNTER",
    description:
      "Linha do portfólio Orion, empresa especializada em tecnologia de aplicação de bioinsumos no plantio.",
    source: "https://orion.ind.br/products?model=hunter",
  },
];
const icons = {
  dashboard:
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',
  chart: '<path d="M4 4v16h16M8 15l4-5 4 2 5-7M17 5h4v4"/>',
  box: '<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v10M7.5 5.5l9 5v4"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 5h2m4 0h2"/>',
  sprout: '<path d="M12 21v-9M12 16C3 17 2 10 3 7c6-1 10 2 9 9Zm0-5c-1-6 3-9 9-8 0 6-3 10-9 8Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M4 12h16m-5-5 5 5-5 5"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  money:
    '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M5 12h.01M19 12h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
};
function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.box}</svg>`;
}
document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
const money = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
const escapeHTML = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );
const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
const id = () =>
  globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dateLabel(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
function seedData() {
  return {
    clients: [
      {
        id: "c1",
        name: "Ricardo Almeida",
        farm: "Fazenda Boa Esperança",
        city: "Marília, SP",
        email: "ricardo@example.com",
        phone: "(14) 99900-1001",
        crop: "Soja",
        status: "Ativo",
      },
      {
        id: "c2",
        name: "Mariana Costa",
        farm: "Sítio Santa Helena",
        city: "Quintana, SP",
        email: "mariana@example.com",
        phone: "(14) 99900-1002",
        crop: "Milho",
        status: "Prospect",
      },
      {
        id: "c3",
        name: "Paulo Oliveira",
        farm: "Fazenda Horizonte",
        city: "Assis, SP",
        email: "paulo@example.com",
        phone: "(18) 99900-1003",
        crop: "Soja",
        status: "Ativo",
      },
      {
        id: "c4",
        name: "Ana Ferreira",
        farm: "Agro Ferreira",
        city: "Pompeia, SP",
        email: "ana@example.com",
        phone: "(14) 99900-1004",
        crop: "Cana-de-açúcar",
        status: "Prospect",
      },
      {
        id: "c5",
        name: "Roberto Santos",
        farm: "Fazenda São José",
        city: "Tupã, SP",
        email: "roberto@example.com",
        phone: "(14) 99900-1005",
        crop: "Milho",
        status: "Ativo",
      },
      {
        id: "c6",
        name: "Camila Ribeiro",
        farm: "Fazenda Bela Vista",
        city: "Garça, SP",
        email: "camila@example.com",
        phone: "(14) 99900-1006",
        crop: "Soja",
        status: "Prospect",
      },
    ],
    deals: [
      {
        id: "d1",
        clientId: "c1",
        product: "hunter",
        value: 48000,
        stage: "Proposta enviada",
        notes: "Apresentar proposta para a próxima safra.",
      },
      {
        id: "d2",
        clientId: "c2",
        product: "target",
        value: 24000,
        stage: "Em atendimento",
        notes: "Entender a necessidade da propriedade.",
      },
      {
        id: "d3",
        clientId: "c3",
        product: "hunter",
        value: 52000,
        stage: "Fechado",
        notes: "Venda fictícia para demonstração.",
      },
      {
        id: "d4",
        clientId: "c4",
        product: "target",
        value: 28000,
        stage: "Novo contato",
        notes: "",
      },
      {
        id: "d5",
        clientId: "c5",
        product: "target",
        value: 26000,
        stage: "Proposta enviada",
        notes: "",
      },
      {
        id: "d6",
        clientId: "c6",
        product: "hunter",
        value: 46000,
        stage: "Novo contato",
        notes: "",
      },
    ],
    tasks: [
      {
        id: "t1",
        title: "Retornar sobre a proposta Hunter",
        clientId: "c1",
        date: dateOffset(0),
        done: false,
      },
      {
        id: "t2",
        title: "Agendar demonstração do Target",
        clientId: "c2",
        date: dateOffset(0),
        done: false,
      },
      {
        id: "t3",
        title: "Visita técnica à propriedade",
        clientId: "c3",
        date: dateOffset(1),
        done: false,
      },
      {
        id: "t4",
        title: "Apresentar as soluções Orion",
        clientId: "c4",
        date: dateOffset(2),
        done: false,
      },
    ],
  };
}
// Uma única fonte de dados alimenta as telas e os indicadores.
let storageWarning = "";
function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return seedData();
    const parsed = JSON.parse(saved);
    if (
      !["clients", "deals", "tasks"].every((key) => Array.isArray(parsed[key])) ||
      !parsed.clients.every((c) => typeof c.id === "string" && typeof c.name === "string") ||
      !parsed.deals.every(
        (d) =>
          typeof d.id === "string" &&
          Number.isFinite(d.value) &&
          d.value >= 0 &&
          stages.includes(d.stage) &&
          products.some((p) => p.id === d.product) &&
          parsed.clients.some((c) => c.id === d.clientId),
      ) ||
      !parsed.tasks.every(
        (t) =>
          typeof t.id === "string" &&
          typeof t.title === "string" &&
          typeof t.done === "boolean" &&
          /^\d{4}-\d{2}-\d{2}$/.test(t.date),
      )
    )
      throw new Error("Dados inválidos");
    return parsed;
  } catch {
    storageWarning = "Não foi possível carregar os dados salvos. A demonstração foi aberta.";
    return seedData();
  }
}
let data = loadData();
const currentPage = document.body.dataset.page;
let searchTerm = "";
let filterValue = "all";
let editing = null;
let toastTimer;
const main = document.getElementById("page-content");
const modal = document.getElementById("modal");
const clientById = (clientId) => data.clients.find((c) => c.id === clientId);
const productById = (productId) => products.find((p) => p.id === productId);
function notify(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 4500);
}
function save(message) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    notify(message);
  } catch {
    notify("Armazenamento bloqueado: a alteração será perdida ao navegar ou atualizar a página.");
  }
  render();
}
function badge(stage) {
  const classes = {
    "Novo contato": "gray",
    "Em atendimento": "blue",
    "Proposta enviada": "gold",
    Fechado: "",
    Ativo: "",
    Prospect: "gold",
  };
  return `<span class="badge ${classes[stage] || ""}">${escapeHTML(stage)}</span>`;
}
function clientCell(c) {
  return `<div class="client-cell"><span class="client-avatar">${escapeHTML(initials(c.name))}</span><div><strong>${escapeHTML(c.name)}</strong><small>${escapeHTML(c.farm)}</small></div></div>`;
}
function rowActions(kind, itemId) {
  return `<div class="actions"><button class="icon-button" data-action="edit" data-kind="${kind}" data-id="${escapeHTML(itemId)}" aria-label="Editar">${icon("edit")}</button><button class="icon-button" data-action="delete" data-kind="${kind}" data-id="${escapeHTML(itemId)}" aria-label="Excluir">${icon("trash")}</button></div>`;
}
function taskMarkup(tasks, editable = false) {
  return tasks.length
    ? `<div class="task-list">${tasks.map((t) => `<div class="task ${t.done ? "done" : ""}"><button class="check-button" data-action="toggle-task" data-id="${escapeHTML(t.id)}" aria-label="${t.done ? "Reabrir" : "Concluir"}: ${escapeHTML(t.title)}" aria-pressed="${t.done}">${t.done ? "✓" : ""}</button><div class="task-content"><strong>${escapeHTML(t.title)}</strong><p>${escapeHTML(clientById(t.clientId)?.farm || "Atividade geral")}</p><span class="task-time">${t.done ? "Concluída" : t.date === dateOffset(0) ? "Hoje" : t.date < dateOffset(0) ? "Atrasada · " + dateLabel(t.date) : dateLabel(t.date)}</span></div>${editable ? rowActions("tasks", t.id) : ""}</div>`).join("")}</div>`
    : '<div class="empty">Tudo em dia por aqui.<br>Nenhuma atividade nesta seleção.</div>';
}
function matches(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .includes(
      searchTerm
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(),
    );
}

// Cada página registra sua função renderPage no respectivo arquivo JavaScript.
function render() {
  if (!demoAuth.isSignedIn()) return;
  document.getElementById("client-count").textContent = data.clients.length;
  if (window.renderPage) window.renderPage();
}
function startPage(renderer) {
  window.renderPage = renderer;
  render();
  if (storageWarning) notify(storageWarning);
}
window.addEventListener("pageshow", () => {
  if (!demoAuth.requireSession()) return;
  data = loadData();
  render();
});
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === null) {
    data = loadData();
    render();
  }
});
function field(label, name, value = "", type = "text", required = true) {
  return `<label class="field">${label}<input name="${name}" type="${type}" value="${escapeHTML(value)}" ${required ? "required" : ""} ${type === "number" ? 'min="0" max="1000000000" step="0.01"' : 'maxlength="160"'}></label>`;
}
function selectField(label, name, options, value, required = true) {
  return `<label class="field">${label}<select name="${name}" ${required ? "required" : ""}>${options.map(([v, t]) => `<option value="${escapeHTML(v)}" ${v === value ? "selected" : ""}>${escapeHTML(t)}</option>`).join("")}</select></label>`;
}
function openEditor(kind, itemId = null, productId = null) {
  if (!window.demoAuth.isSignedIn()) return;
  if (kind === "deals" && !data.clients.length) {
    notify("Cadastre um cliente antes de criar uma negociação.");
    openEditor("clients");
    return;
  }
  const item = data[kind].find((x) => x.id === itemId) || {};
  editing = { kind, itemId };
  document.getElementById("modal-title").textContent =
    `${itemId ? "Editar" : "Cadastrar"} ${{ clients: "cliente", deals: "negociação", tasks: "atividade" }[kind]}`;
  const clientOptions = data.clients.map((c) => [c.id, `${c.name} · ${c.farm}`]);
  let fields = "";
  if (kind === "clients")
    fields =
      field("Nome do cliente *", "name", item.name) +
      field("Propriedade / empresa *", "farm", item.farm) +
      field("Cidade / UF *", "city", item.city) +
      field("E-mail", "email", item.email, "email", false) +
      field("Telefone", "phone", item.phone, "tel", false) +
      selectField(
        "Cultura principal",
        "crop",
        ["Soja", "Milho", "Cana-de-açúcar", "Café", "Trigo", "Outra"].map((c) => [c, c]),
        item.crop,
      ) +
      selectField(
        "Status",
        "status",
        [
          ["Prospect", "Prospect"],
          ["Ativo", "Ativo"],
        ],
        item.status,
      );
  if (kind === "deals")
    fields =
      selectField("Cliente *", "clientId", clientOptions, item.clientId) +
      selectField(
        "Linha de produto *",
        "product",
        products.map((p) => [p.id, p.name]),
        productId || item.product,
      ) +
      field("Valor estimado (R$) · demonstração *", "value", item.value ?? "", "number") +
      selectField(
        "Etapa",
        "stage",
        stages.map((s) => [s, s]),
        item.stage,
      ) +
      `<label class="field">Observações<textarea name="notes" maxlength="1000">${escapeHTML(item.notes || "")}</textarea></label>`;
  if (kind === "tasks")
    fields =
      field("O que precisa ser feito? *", "title", item.title) +
      selectField(
        "Cliente relacionado",
        "clientId",
        [["", "Atividade geral"], ...clientOptions],
        item.clientId,
        false,
      ) +
      field("Data *", "date", item.date || dateOffset(0), "date");
  document.getElementById("form-fields").innerHTML = fields;
  modal.showModal();
}
document.getElementById("close-modal").onclick = () => modal.close();
document.getElementById("cancel-modal").onclick = () => modal.close();
document.getElementById("editor").addEventListener("submit", (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  Object.keys(values).forEach((key) => (values[key] = values[key].trim()));
  const required =
    editing.kind === "clients"
      ? ["name", "farm", "city"]
      : editing.kind === "tasks"
        ? ["title", "date"]
        : ["clientId", "product", "value"];
  if (required.some((key) => !values[key])) {
    notify("Preencha os campos obrigatórios.");
    return;
  }
  if (editing.kind === "deals") {
    values.value = Number(values.value);
    if (!Number.isFinite(values.value) || values.value < 0) {
      notify("Informe um valor válido.");
      return;
    }
  }
  if (editing.itemId) {
    const index = data[editing.kind].findIndex((x) => x.id === editing.itemId);
    data[editing.kind][index] = { ...data[editing.kind][index], ...values };
  } else
    data[editing.kind].unshift({
      id: id(),
      ...values,
      ...(editing.kind === "tasks" ? { done: false } : {}),
    });
  modal.close();
  save(editing.itemId ? "Registro atualizado." : "Registro cadastrado com sucesso.");
});
document.getElementById("main").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, kind, id: itemId, product } = button.dataset;
  if (action === "add") openEditor(kind);
  if (action === "edit") openEditor(kind, itemId);
  if (action === "toggle-task") {
    const task = data.tasks.find((t) => t.id === itemId);
    task.done = !task.done;
    save(task.done ? "Atividade concluída. Bom trabalho!" : "Atividade reaberta.");
  }
  if (action === "delete") {
    if (
      kind === "clients" &&
      (data.deals.some((d) => d.clientId === itemId) ||
        data.tasks.some((t) => t.clientId === itemId))
    ) {
      notify(
        "Este cliente possui negociações ou atividades. Remova ou reatribua os vínculos antes de excluir.",
      );
      return;
    }
    if (confirm("Excluir este registro? Esta ação não pode ser desfeita.")) {
      data[kind] = data[kind].filter((x) => x.id !== itemId);
      save("Registro excluído.");
    }
  }
});
document.getElementById("main").addEventListener("change", (event) => {
  if (event.target.id === "filter") {
    filterValue = event.target.value;
    render();
  }
});
document.getElementById("main").addEventListener("input", (event) => {
  if (event.target.id === "search") {
    const position = event.target.selectionStart;
    searchTerm = event.target.value;
    render();
    const input = document.getElementById("search");
    input.focus();
    if (input.setSelectionRange) input.setSelectionRange(position, position);
  }
});
