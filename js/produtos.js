// Preenche o catálogo e abre uma negociação para o produto escolhido.
function renderProducts() {
  document.getElementById("product-list").innerHTML = products
    .map(
      (p) =>
        `<article class="product-card"><div class="product-image"><img src="${p.image}" alt="Equipamento da linha ${p.name} da Orion"></div><div class="product-content"><span class="eyebrow">${p.label}</span><h2>${p.name}</h2><p>${p.description}</p><div class="product-actions"><button class="button primary" data-action="product-deal" data-product="${p.id}">${icon("plus")} Criar negociação</button><a class="text-link" href="${p.source}" target="_blank" rel="noopener noreferrer">Ver no site oficial ${icon("arrow")}</a></div></div></article>`,
    )
    .join("");
}
startPage(renderProducts);

document.getElementById("product-list").addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="product-deal"]');
  if (button) openEditor("deals", null, button.dataset.product);
});
