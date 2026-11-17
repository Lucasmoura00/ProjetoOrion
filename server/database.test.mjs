import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openDatabase, siteData, createTicket } from './database.mjs';

test('dados originais, integridade, gravação e persistência após reabrir', () => {
  const directory = mkdtempSync(join(tmpdir(), 'orion-test-'));
  const path = join(directory, 'test.sqlite');
  let db = openDatabase(path);
  try {
    let data = siteData(db);
    assert.deepEqual([data.clients.length, data.equipment.length, data.problems.length, data.tickets.length, data.steps.length], [3, 5, 8, 5, 4]);
    assert.equal(data.clients[0].name, 'João Silva');
    assert.equal(data.tickets[0].date, '20/06/2024');
    assert.equal(data.tickets[0].client, null);
    const input = { clientId: 1, equipmentId: 2, problemId: 3, description: 'Teste de persistência', priority: 'Alta' };
    const id = createTicket(db, input);
    assert.equal(id, 1251);
    assert.throws(() => createTicket(db, { ...input, equipmentId: 999 }));
    assert.throws(() => createTicket(db, { ...input, description: ' ' }));
    assert.throws(() => createTicket(db, { ...input, priority: 'Urgente' }));
    assert.throws(() => db.prepare('DELETE FROM clientes WHERE id = 1').run());
    assert.throws(() => db.prepare("INSERT INTO clientes VALUES (4, 'Duplicado', '123.456.789-00', 'Cidade')").run());
    assert.throws(() => db.prepare("UPDATE chamados SET status = 'Inválido' WHERE id = ?").run(id));
    assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(), []);
    db.close(); db = openDatabase(path);
    data = siteData(db);
    assert.equal(data.tickets.length, 6);
    assert.equal(data.tickets[0].client, 'João Silva');
    assert.equal(db.prepare('SELECT descricao FROM chamados WHERE id = ?').get(id).descricao, input.description);
    assert.equal(db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
  } finally { db.close(); rmSync(directory, { recursive: true }); }
});
