// Entrada do projeto; mantém links antigos com hash funcionando.
const legacyPages = {
  dashboard: "dashboard.html",
  clients: "clientes.html",
  deals: "negociacoes.html",
  products: "produtos.html",
  tasks: "atividades.html",
  about: "sobre.html",
};
const target = legacyPages[location.hash.slice(1)] || "dashboard.html";
location.replace(demoAuth.isSignedIn() ? target : "login.html?next=" + encodeURIComponent(target));
