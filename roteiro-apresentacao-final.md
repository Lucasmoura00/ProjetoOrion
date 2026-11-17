# Roteiro da apresentação final do Orion Service

Abra `apresentacao-final-orion.html` no navegador e clique em **Iniciar apresentação**. São três slides, seguindo a divisão da orientação fotografada, e depois a demonstração do sistema funcionando. Não há capa extra.

Use as setas para navegar, **F** para entrar em tela cheia e **Esc** para sair. **D** abre o site local em outra aba; o último slide também tem um link para a demonstração. Se o navegador bloquear a tela cheia, use **F11**. Os slides funcionam offline; a demonstração depende do servidor local.

## Slide 1 Problema e solução

“Nosso projeto busca organizar o suporte aos equipamentos. A proposta é reunir informações que poderiam ficar dispersas, facilitar a consulta de orientações e registrar pedidos de atendimento. No Orion Service, o usuário consulta os equipamentos, procura um problema na base de conhecimento e, se precisar, abre um chamado. Esse chamado é gravado no banco e aparece na lista para acompanhamento.”

Mostre a relação entre cada problema à esquerda e a solução correspondente à direita. Apresente a necessidade como a proposta do projeto, sem afirmar que houve pesquisa com clientes ou medição de resultados.

## Slide 2 Tecnologias e declaração de IA

“A interface foi desenvolvida com React, JavaScript, HTML e CSS. O servidor Node.js recebe as solicitações e consulta o banco SQLite. O Vite é usado para executar e compilar a interface, e o DBeaver permite mostrar o banco separado do site. Utilizamos ChatGPT/Codex como apoio no código, na integração, nos testes e nos materiais. O grupo continua responsável por compreender e validar o que apresenta.”

Não descreva o login como autenticação real. Ele ainda é demonstrativo, e o projeto funciona localmente. A menção a testes se refere ao apoio na implementação e execução dos testes do projeto, não a uma certificação de produção.

## Slide 3 Matriz SWOT

“Entre as forças, destacamos a centralização e a facilidade de consulta. Como limitações, temos a dependência da qualidade dos dados e funcionalidades que ainda precisam evoluir. As oportunidades incluem integrações e novos relatórios. As ameaças estão na defasagem, na falta de atualizações e no risco de o sistema perder utilidade.”

As integrações com WhatsApp, e-mail e planilhas são oportunidades futuras, não recursos já implementados. A SWOT resume a matriz fornecida pelo grupo, com o texto ajustado ao Orion Service atual.

## Demonstração do sistema funcionando

Antes da apresentação, execute `npm.cmd run dev` na pasta do projeto. Confira `http://localhost:5173` e abra no DBeaver o arquivo `database/orion.sqlite`. Mantenha o terminal aberto. Não é necessário publicar o site para executar essa demonstração local; publicação e acesso público, caso exigidos pelo professor, são uma etapa separada que estes slides não realizam.

1. Pressione **D** ou clique em **Demonstração do sistema** no último slide.
2. Entre com dados fictícios no login demonstrativo.
3. Mostre o Dashboard e a opção de recolher e expandir o menu.
4. Em **Meus equipamentos**, pesquise “Hunter” e mostre o filtro de situação.
5. Abra o primeiro equipamento, escolha **Problemas de pressão** e depois a primeira solução.
6. Clique em **Não resolveu**. Selecione cliente, equipamento e problema, escreva “Chamado de demonstração do grupo” e salve.
7. Mostre o novo chamado no início da lista e os indicadores do painel administrativo.
8. No DBeaver, atualize a tabela `chamados` para mostrar o registro persistido.

Os detalhes dos equipamentos e a tela de solução ainda apresentam exemplos fixos. “Problema resolvido” apenas muda de tela; não altera o status de um chamado. Ao atualizar o navegador, o chamado permanece salvo. Cada ensaio acrescenta registros ao banco.

Para retornar aos slides, volte à aba da apresentação e pressione **F**. Dividam as falas por assunto: problema e solução; tecnologias e IA; SWOT; demonstração. Ajustem a divisão ao número de integrantes e ao tempo informado pelo professor.
