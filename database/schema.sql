PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  cidade TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS equipamentos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE RESTRICT,
  nome TEXT NOT NULL,
  modelo TEXT NOT NULL,
  numero_serie TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK(status IN ('Operacional', 'Atenção', 'Parado')),
  ano INTEGER,
  fabricante TEXT,
  versao TEXT
);
CREATE TABLE IF NOT EXISTS problemas (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  causa TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS passos_solucao (
  id INTEGER PRIMARY KEY,
  problema_id INTEGER NOT NULL REFERENCES problemas(id) ON DELETE RESTRICT,
  ordem INTEGER NOT NULL CHECK(ordem > 0),
  instrucao TEXT NOT NULL,
  UNIQUE(problema_id, ordem)
);
CREATE TABLE IF NOT EXISTS chamados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE RESTRICT,
  equipamento_id INTEGER REFERENCES equipamentos(id) ON DELETE RESTRICT,
  problema_id INTEGER REFERENCES problemas(id) ON DELETE RESTRICT,
  equipamento_original TEXT NOT NULL,
  assunto TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  data_abertura TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Aberto', 'Em atendimento', 'Resolvido')),
  prioridade TEXT CHECK(prioridade IN ('Baixa', 'Média', 'Alta'))
);
CREATE INDEX IF NOT EXISTS idx_chamados_cliente ON chamados(cliente_id);
CREATE INDEX IF NOT EXISTS idx_chamados_equipamento ON chamados(equipamento_id);
CREATE INDEX IF NOT EXISTS idx_chamados_problema ON chamados(problema_id);
CREATE INDEX IF NOT EXISTS idx_equipamentos_cliente ON equipamentos(cliente_id);

CREATE VIEW IF NOT EXISTS resumo_chamados AS
SELECT ch.id, cl.nome AS cliente, COALESCE(e.nome, ch.equipamento_original) AS equipamento,
       e.numero_serie, ch.assunto, ch.data_abertura, ch.status, ch.prioridade
FROM chamados ch
LEFT JOIN clientes cl ON cl.id = ch.cliente_id
LEFT JOIN equipamentos e ON e.id = ch.equipamento_id;
