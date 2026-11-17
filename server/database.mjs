import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { clients, equipment, problems, tickets } from '../src/data/mock.js';

export const databasePath = fileURLToPath(new URL('../database/orion.sqlite', import.meta.url));
export function openDatabase(path = databasePath) {
  mkdirSync(fileURLToPath(new URL('../database', import.meta.url)), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(readFileSync(new URL('../database/schema.sql', import.meta.url), 'utf8'));
  // A inicialização é atômica e só ocorre em um banco ainda vazio.
  if (!db.prepare('SELECT COUNT(*) AS n FROM clientes').get().n) {
    db.exec('BEGIN');
    try {
      clients.forEach((c, i) => db.prepare('INSERT INTO clientes VALUES (?, ?, ?, ?)').run(i + 1, c.name, c.cpf, c.city));
      equipment.forEach((e, i) => db.prepare('INSERT INTO equipamentos VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?)').run(i + 1, e.name, e.model, e.serial, e.status, i === 0 ? 2023 : null, i === 0 ? 'John Deere' : null, i === 0 ? 'V2.4.1' : null));
      problems.forEach((p, i) => db.prepare('INSERT INTO problemas VALUES (?, ?, ?, ?)').run(i + 1, p.title, p.desc, p.cause));
      ['Verifique se há obstrução nos filtros e nas mangueiras.', 'Confira as conexões e abraçadeiras do sistema.', 'Verifique o regulador de pressão.', 'Faça um teste de pressão no sistema.'].forEach((s, i) => db.prepare('INSERT INTO passos_solucao VALUES (?, 1, ?, ?)').run(i + 1, i + 1, s));
      tickets.forEach(t => db.prepare('INSERT INTO chamados (id, equipamento_original, assunto, data_abertura, status) VALUES (?, ?, ?, ?, ?)').run(Number(t.id.slice(1)), t.machine, t.problem, t.date.split('/').reverse().join('-'), t.status));
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); db.close(); throw error; }
  }
  return db;
}

export function siteData(db) {
  return {
    clients: db.prepare('SELECT id, nome AS name, cpf, cidade AS city FROM clientes').all(),
    equipment: db.prepare('SELECT id, nome AS name, modelo AS model, numero_serie AS serial, status FROM equipamentos').all(),
    problems: db.prepare('SELECT id, titulo AS title, descricao AS desc, causa AS cause FROM problemas').all(),
    steps: db.prepare('SELECT problema_id AS problemId, instrucao AS instruction FROM passos_solucao ORDER BY ordem').all(),
    tickets: db.prepare("SELECT '#' || id AS id, equipamento AS machine, assunto AS problem, substr(data_abertura,9,2)||'/'||substr(data_abertura,6,2)||'/'||substr(data_abertura,1,4) AS date, status, cliente AS client FROM resumo_chamados ORDER BY id DESC").all()
  };
}

export function createTicket(db, input) {
  const { clientId, equipmentId, problemId, description, priority } = input;
  if (![clientId, equipmentId, problemId].every(Number.isSafeInteger) || typeof description !== 'string' || !description.trim() || description.length > 5000 || !['Baixa', 'Média', 'Alta'].includes(priority)) throw new Error('Preencha os campos corretamente (descrição de até 5.000 caracteres).');
  const client = db.prepare('SELECT id FROM clientes WHERE id = ?').get(clientId);
  const equipment = db.prepare('SELECT * FROM equipamentos WHERE id = ?').get(equipmentId);
  const problem = db.prepare('SELECT * FROM problemas WHERE id = ?').get(problemId);
  if (!client || !equipment || !problem) throw new Error('Cliente, equipamento ou problema não encontrado.');
  if (equipment.cliente_id !== null && equipment.cliente_id !== clientId) throw new Error('Equipamento vinculado a outro cliente.');
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return Number(db.prepare("INSERT INTO chamados (cliente_id, equipamento_id, problema_id, equipamento_original, assunto, descricao, data_abertura, status, prioridade) VALUES (?, ?, ?, ?, ?, ?, ?, 'Aberto', ?)").run(clientId, equipmentId, problemId, equipment.nome, problem.titulo, description.trim(), date, priority).lastInsertRowid);
}
