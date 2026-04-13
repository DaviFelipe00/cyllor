import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const DEFAULT_DB_PATH = path.resolve(process.cwd(), 'data', 'cyllor.sqlite');
const databasePath = import.meta.env.DATABASE_PATH || process.env.DATABASE_PATH || DEFAULT_DB_PATH;

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const db = new Database(databasePath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    interest TEXT NOT NULL,
    challenge TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertLeadStatement = db.prepare(`
  INSERT INTO leads (name, email, company, interest, challenge)
  VALUES (@name, @email, @company, @interest, @challenge)
`);

const listLeadsStatement = db.prepare(`
  SELECT id, name, email, company, interest, challenge, created_at
  FROM leads
  ORDER BY datetime(created_at) DESC, id DESC
`);

const countLeadsStatement = db.prepare(`
  SELECT COUNT(*) AS total
  FROM leads
`);

export function createLead(lead: {
  name: string;
  email: string;
  company: string;
  interest: string;
  challenge: string;
}) {
  const result = insertLeadStatement.run(lead);
  return Number(result.lastInsertRowid);
}

export function listLeads() {
  return listLeadsStatement.all() as Array<{
    id: number;
    name: string;
    email: string;
    company: string;
    interest: string;
    challenge: string;
    created_at: string;
  }>;
}

export function getLeadStats() {
  const row = countLeadsStatement.get() as { total: number };
  return {
    total: row.total,
    databasePath,
  };
}
