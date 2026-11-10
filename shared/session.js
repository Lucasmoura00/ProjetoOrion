/* Sessão de demonstração compartilhada. Não substitui autenticação em servidor. */
(() => {
  const key = "orion-crm-demo-session";
  const pages = [
    "dashboard.html",
    "clientes.html",
    "negociacoes.html",
    "produtos.html",
    "atividades.html",
    "sobre.html",
  ];
  function isSignedIn() {
    try {
      return sessionStorage.getItem(key) === "active";
    } catch {
      return false;
    }
  }
  function destination() {
    const next = new URLSearchParams(location.search).get("next");
    return pages.includes(next) ? next : "dashboard.html";
  }
  function requireSession() {
    if (!document.body.dataset.page) return true;
    if (!isSignedIn()) {
      document.body.classList.add("is-locked");
      const file = location.pathname.split("/").pop();
      location.replace(
        "login.html?next=" + encodeURIComponent(pages.includes(file) ? file : "dashboard.html"),
      );
      return false;
    }
    document.body.classList.remove("is-locked");
    return true;
  }
  function signIn() {
    try {
      sessionStorage.setItem(key, "active");
      return true;
    } catch {
      return false;
    }
  }
  window.demoAuth = { isSignedIn, destination, requireSession, signIn };
  requireSession();
  if (document.body.classList.contains("login-page") && isSignedIn())
    location.replace(destination());
  document.getElementById("logout")?.addEventListener("click", () => {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* Sessão já indisponível. */
    }
    document.body.classList.add("is-locked");
    location.replace("login.html");
  });
  // Revalida a sessão quando o navegador restaura uma página pelo botão Voltar.
  window.addEventListener("pageshow", requireSession);
})();
