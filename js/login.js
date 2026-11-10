// Validação didática das credenciais e interação do formulário de login.
(() => {
  const credentials = { email: "aluno@orion.demo", password: "Orion123!" };
  const form = document.getElementById("login-form");
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  const error = document.getElementById("login-error");
  const toggle = document.getElementById("toggle-password");

  function resetFeedback() {
    error.textContent = "";
    email.removeAttribute("aria-invalid");
    password.removeAttribute("aria-invalid");
  }
  function hidePassword() {
    password.type = "password";
    toggle.textContent = "Mostrar";
    toggle.setAttribute("aria-label", "Mostrar senha");
    toggle.setAttribute("aria-pressed", "false");
  }
  toggle.addEventListener("click", () => {
    const reveal = password.type === "password";
    password.type = reveal ? "text" : "password";
    toggle.textContent = reveal ? "Ocultar" : "Mostrar";
    toggle.setAttribute("aria-label", reveal ? "Ocultar senha" : "Mostrar senha");
    toggle.setAttribute("aria-pressed", String(reveal));
  });
  form.addEventListener("input", resetFeedback);
  document.getElementById("fill-credentials").addEventListener("click", () => {
    email.value = credentials.email;
    password.value = credentials.password;
    resetFeedback();
    hidePassword();
    form.querySelector('[type="submit"]').focus();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    resetFeedback();
    if (
      email.value.trim().toLowerCase() !== credentials.email ||
      password.value !== credentials.password
    ) {
      error.textContent =
        "E-mail ou senha incorretos. Confira as credenciais de demonstração abaixo.";
      email.setAttribute("aria-invalid", "true");
      password.setAttribute("aria-invalid", "true");
      password.focus();
      return;
    }
    if (!demoAuth.signIn()) {
      error.textContent = "Permita o armazenamento do navegador para acessar as páginas do CRM.";
      return;
    }
    form.reset();
    hidePassword();
    location.replace(demoAuth.destination());
  });
})();
