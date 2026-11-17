-- Quantidade de equipamentos por status.
SELECT status, COUNT(*) AS quantidade FROM equipamentos GROUP BY status;

-- Chamados com seus vínculos, incluindo os antigos sem identificação.
SELECT * FROM resumo_chamados ORDER BY id DESC;

-- Passos em sequência para cada problema com solução cadastrada.
SELECT p.titulo, s.ordem, s.instrucao
FROM problemas p JOIN passos_solucao s ON s.problema_id = p.id
ORDER BY p.id, s.ordem;

-- Quantidade de chamados por cliente (mantém clientes sem chamados).
SELECT c.id, c.nome, COUNT(ch.id) AS total_chamados
FROM clientes c LEFT JOIN chamados ch ON ch.cliente_id = c.id
GROUP BY c.id, c.nome;

-- Conferência da integridade do arquivo e das chaves estrangeiras.
PRAGMA integrity_check;
PRAGMA foreign_key_check;
