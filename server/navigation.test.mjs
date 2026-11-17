import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNavigation, currentPage } from '../src/navigation.js';

function browserAt(hash = '') {
  let index = 0;
  const entries = [{ hash, state: null }], listeners = new Map();
  const browser = {
    location: { hash }, scrollTo() {},
    addEventListener(name, handler) { listeners.set(name, handler); },
    removeEventListener(name) { listeners.delete(name); },
    history: {
      get state() { return entries[index].state; },
      replaceState(state, _, hash) { entries[index] = { state, hash }; browser.location.hash = hash; },
      pushState(state, _, hash) { entries.splice(++index); entries.push({ state, hash }); browser.location.hash = hash; },
      back() { assert.ok(index > 0, 'não deve sair do site'); index--; browser.location.hash = entries[index].hash; listeners.get('popstate')(); },
      forward() { index++; browser.location.hash = entries[index].hash; listeners.get('popstate')(); }
    }
  };
  return browser;
}

test('voltar e avançar respeitam a sequência de telas sem repetir o login', () => {
  const browser = browserAt();
  let page;
  const nav = createNavigation(browser, next => { page = next; });
  nav.navigate('dashboard');
  nav.navigate('machines');
  nav.navigate('detail');
  nav.navigate('knowledge');
  nav.navigate('solution');
  nav.back(); assert.equal(page, 'knowledge');
  browser.history.back(); assert.equal(page, 'detail');
  browser.history.forward(); assert.equal(page, 'knowledge');
  nav.navigate('knowledge'); // Não cria uma entrada duplicada.
  nav.back(); assert.equal(page, 'detail');
  nav.back(); assert.equal(page, 'machines');
  nav.back(); assert.equal(page, 'dashboard');
  nav.back(); assert.equal(page, 'dashboard');
  nav.dispose();
});

test('link direto volta ao painel e recarregar preserva a tela e o histórico', () => {
  const browser = browserAt('#knowledge');
  let page = currentPage(browser);
  let nav = createNavigation(browser, next => { page = next; });
  nav.back(); assert.equal(page, 'dashboard');
  nav.navigate('tickets');
  nav.navigate('ticket-form');
  nav.dispose();
  assert.equal(currentPage(browser), 'ticket-form');
  nav = createNavigation(browser, next => { page = next; });
  nav.back(); assert.equal(page, 'tickets');
  nav.navigate('login'); assert.equal(page, 'login');
  assert.equal(browser.history.state.depth, 0);
  nav.dispose();
});
