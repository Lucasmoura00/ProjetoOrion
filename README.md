# Orion Service

A entrada atual do site utiliza React e Vite. Para executar localmente:

```powershell
npm ci
npm run dev
```

Abra o endereço informado pelo Vite (normalmente http://localhost:5173). Para gerar a versão de produção, execute `npm run build`; para conferir o resultado, execute `npm run preview`.

As páginas HTML do protótipo CRM também estão preservadas neste repositório. A documentação abaixo se refere a esse protótipo anterior.

---

# Orion CRM

Protótipo acadêmico de CRM para um projeto de Bacharelado em Ciência da Computação. Interface em português, responsiva e feita com HTML, CSS e JavaScript puro, sem etapa de compilação.

## Como abrir

Execute na pasta do projeto para servir todas as páginas no mesmo endereço e compartilhar corretamente a sessão e os dados:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Acesse http://localhost:5500. O `index.html` encaminha para o login ou para a visão geral. Mantenha o terminal aberto; Ctrl+C encerra o servidor. Use sempre o mesmo endereço, pois cada origem do navegador possui armazenamento separado. Abrir os arquivos diretamente com `file://` pode impedir o compartilhamento do armazenamento entre páginas, dependendo do navegador.

## Funcionalidades

- Visão geral com indicadores calculados a partir dos registros.
- Cadastro, edição, busca, filtro e exclusão de clientes.
- Negociações associadas a clientes e produtos, com valor e quatro etapas.
- Mudança de etapa pelo seletor de cada cartão do funil.
- Catálogo de duas linhas reais da Orion, com imagens locais e links oficiais.
- Atividades com data, cliente opcional e conclusão/reabertura.
- Persistência em `localStorage` e exportação JSON na tela Sobre o projeto.
- Proteção contra exclusão de clientes com negociações ou atividades vinculadas.

## Como explicar o código

1. Cada tela tem seu próprio HTML, CSS e JavaScript, conforme a tabela abaixo. O HTML contém a estrutura da tela; o JavaScript preenche os registros e trata as interações.
2. Os arquivos em `css/` definem o visual específico de cada tela. `shared/base.css` reúne os estilos reutilizados, como menu, botões e formulários.
3. `shared/crm.js` contém as listas `clients`, `deals` e `tasks`, os componentes reutilizados e os formulários. Produtos são referências fixas. Os arquivos em `js/` implementam a lógica específica de cada página.
4. Os identificadores conectam uma negociação ou tarefa ao cliente (`clientId`).
5. As funções `render...` apresentam os dados na tela. Eventos de formulário modificam as listas.
6. `save()` converte as listas para JSON e salva no navegador. `loadData()` recupera os dados.
7. O dashboard soma valores e conta os registros por etapa; seus indicadores não são números fixos.

## Arquivos por tela

| Tela                     | HTML               | CSS                   | JavaScript          |
| ------------------------ | ------------------ | --------------------- | ------------------- |
| Entrada / encaminhamento | `index.html`       | `css/index.css`       | `js/index.js`       |
| Login                    | `login.html`       | `css/login.css`       | `js/login.js`       |
| Visão geral              | `dashboard.html`   | `css/dashboard.css`   | `js/dashboard.js`   |
| Clientes                 | `clientes.html`    | `css/clientes.css`    | `js/clientes.js`    |
| Negociações              | `negociacoes.html` | `css/negociacoes.css` | `js/negociacoes.js` |
| Produtos                 | `produtos.html`    | `css/produtos.css`    | `js/produtos.js`    |
| Atividades               | `atividades.html`  | `css/atividades.css`  | `js/atividades.js`  |
| Sobre                    | `sobre.html`       | `css/sobre.css`       | `js/sobre.js`       |

Arquivos compartilhados:

- `shared/base.css`: aparência comum, componentes e responsividade.
- `shared/session.js`: sessão de demonstração, verificação de acesso às páginas e saída.
- `shared/crm.js`: dados, armazenamento, ícones, componentes de lista, pesquisa e formulários reutilizados.

A navegação usa links HTML normais, sem roteador ou framework. Cada página carrega apenas seu JavaScript, seu CSS e os arquivos compartilhados necessários. Os dados permanecem no `localStorage`, usando a mesma chave da versão anterior. O login usa `sessionStorage`, preservando a sessão ao navegar entre arquivos da mesma origem. Links antigos como `index.html#clients` continuam encaminhando para a tela correspondente.

## Roteiro de apresentação

1. Explique o problema: contatos, propostas e retornos comerciais espalhados.
2. Mostre o resumo comercial e as quatro etapas de negociação.
3. Cadastre um cliente com propriedade, cidade e cultura.
4. Crie uma negociação para esse cliente com a linha Target ou Hunter.
5. Altere sua etapa e mostre o indicador atualizado na visão geral.
6. Agende uma atividade, conclua e reabra para demonstrar a interação.
7. Atualize a página para demonstrar a persistência.
8. Apresente o catálogo e a tela Sobre o projeto.

## Empresa e fontes

A Orion Tecnologia e Sistemas Agrícolas, em Quintana/SP, apresenta equipamentos voltados à aplicação de bioinsumos líquidos no sulco de plantio. O portfólio inclui as linhas Target e Hunter.

- Empresa: https://orion.ind.br/
- Target: https://orion.ind.br/products?model=target
- Hunter: https://orion.ind.br/products?model=hunter
- Imagem Target: https://orion.ind.br/images/home/t300.webp
- Imagem Hunter: https://orion.ind.br/images/home/h2000.webp
- Referência indicada pelo aluno: https://cygniagroscience.com/

Consulta em 21/09/2026. O site da Cygni não apresentou conteúdo público legível suficiente para confirmar seus produtos; nenhuma integração ou relação comercial foi presumida. Textos do catálogo são resumos, sem especificações técnicas inventadas. Imagens pertencem aos respectivos titulares e são usadas como referência acadêmica. O símbolo e a apresentação visual do protótipo não representam uma identidade oficial aprovada.

## Limitações

Clientes, telefones, propriedades e valores são fictícios. O login é uma simulação no navegador: não há autenticação em servidor, banco de dados ou integração com Orion/Cygni. As credenciais são públicas no código e não protegem os dados do CRM. Os dados não são compartilhados entre navegadores ou computadores. Limpar o armazenamento do navegador remove os registros. A exportação gera uma cópia JSON; não há importação nesta versão. Fontes do Google são opcionais e têm alternativa local; imagens foram baixadas para funcionar sem conexão.

Próximos passos possíveis: API, banco de dados, autenticação e perfis de acesso, caso a faculdade exija. O conteúdo preexistente de `assets` foi preservado; as imagens deste CRM ficam em `assets/crm`.

## Login de demonstração

- E-mail: `aluno@orion.demo`
- Senha: `Orion123!`
- A tela também permite preencher essas credenciais com um botão.
- `js/login.js` compara os campos com os valores de demonstração e exibe um erro se forem diferentes. Não há requisição a servidor de autenticação.
- `sessionStorage` mantém um marcador de acesso após atualizar a aba. A senha não é salva.
- O botão **Sair**, no cabeçalho, encerra esse acesso e retorna ao login, preservando os registros comerciais.
- A sessão é limitada à aba; o fechamento normalmente a encerra, mas o navegador pode restaurá-la ao restaurar abas. Use **Sair** para encerrá-la explicitamente.
- O armazenamento de sessão precisa estar disponível para manter o acesso entre as páginas. Caso esteja bloqueado, o login explica que é necessário permiti-lo.
- Para apresentar, tente uma senha incorreta, entre com as credenciais acima e demonstre o botão Sair.

Este fluxo ensina formulários, validação condicional, eventos e estado de sessão. Uma versão real precisaria validar usuários no servidor, armazenar hashes de senha e autorizar o acesso aos dados.
