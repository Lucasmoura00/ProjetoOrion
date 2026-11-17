import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { openDatabase, siteData, createTicket, databasePath } from './database.mjs';

const db = openDatabase();
const tables = ['clientes', 'equipamentos', 'problemas', 'passos_solucao', 'chamados', 'resumo_chamados'];
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const json = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  try {
    if (req.method === 'GET' && url.pathname === '/api/data') return json(200, siteData(db));
    if (req.method === 'GET' && url.pathname === '/api/database') return json(200, tables.map(name => ({ name, columns: db.prepare(`PRAGMA table_info(${name})`).all(), foreignKeys: db.prepare(`PRAGMA foreign_key_list(${name})`).all(), rows: db.prepare(`SELECT * FROM ${name}`).all() })));
    if (req.method === 'GET' && url.pathname === '/api/schema') { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(readFileSync(new URL('../database/schema.sql', import.meta.url))); }
    if (req.method === 'GET' && url.pathname === '/api/database/download') { res.writeHead(200, { 'Content-Type': 'application/vnd.sqlite3', 'Content-Disposition': 'attachment; filename="orion.sqlite"' }); return res.end(readFileSync(databasePath)); }
    if (req.method === 'POST' && url.pathname === '/api/tickets') {
      // O servidor acadêmico só aceita gravação originada no próprio ambiente local.
      const origin = req.headers.origin;
      if (origin && !/^http:\/\/(localhost|127\.0\.0\.1):(5173|4173|3001)$/.test(origin)) return json(403, { error: 'Origem não permitida.' });
      if (!req.headers['content-type']?.startsWith('application/json')) return json(415, { error: 'Envie JSON.' });
      let body = '';
      for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 24000) return json(413, { error: 'Requisição muito grande.' }); }
      try { return json(201, { id: createTicket(db, JSON.parse(body)) }); }
      catch (error) { return json(400, { error: error.message }); }
    }
    json(404, { error: 'Rota não encontrada.' });
  } catch (error) { console.error(error); json(500, { error: 'Falha ao acessar o banco.' }); }
});
server.listen(3001, '127.0.0.1', () => console.log('Banco Orion: http://localhost:3001/api/database'));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { db.close(); process.exit(0); }));
