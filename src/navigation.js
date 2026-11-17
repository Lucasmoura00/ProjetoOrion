const pages = new Set(['login', 'dashboard', 'machines', 'detail', 'knowledge', 'solution', 'ticket-form', 'tickets', 'admin']);

export function currentPage(browser) {
  const page = browser.location.hash.slice(1);
  if (page === 'database') return 'dashboard';
  return pages.has(page) ? page : 'login';
}

export function createNavigation(browser, onChange) {
  const state = browser.history.state;
  browser.history.replaceState({ orion: true, depth: state?.orion ? state.depth : 0 }, '', `#${currentPage(browser)}`);

  function navigate(page, replace = false) {
    if (!pages.has(page) || page === currentPage(browser)) return;
    const previous = currentPage(browser);
    const depth = browser.history.state?.orion ? browser.history.state.depth : 0;
    // Entrar e sair iniciam um novo fluxo; voltar não deve reabrir o formulário de login.
    const reset = page === 'login' || previous === 'login';
    const method = replace || reset ? 'replaceState' : 'pushState';
    browser.history[method]({ orion: true, depth: reset ? 0 : replace ? depth : depth + 1 }, '', `#${page}`);
    onChange(page);
    browser.scrollTo(0, 0);
  }

  function back() {
    if (browser.history.state?.orion && browser.history.state.depth > 0) browser.history.back();
    else navigate('dashboard', true);
  }

  function sync() {
    // Um link direto ou fragmento digitado também deve ter uma volta segura.
    if (!browser.history.state?.orion) browser.history.replaceState({ orion: true, depth: 0 }, '', `#${currentPage(browser)}`);
    onChange(currentPage(browser));
    browser.scrollTo(0, 0);
  }
  browser.addEventListener('popstate', sync);
  browser.addEventListener('hashchange', sync);
  return {
    navigate, back,
    dispose() {
      browser.removeEventListener('popstate', sync);
      browser.removeEventListener('hashchange', sync);
    }
  };
}
