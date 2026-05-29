import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pgQuery, getClient } from './connection';

interface Migration {
  id: string;
  filename: string;
  sql: string;
}

// Migration table tracking
async function createMigrationTable() {
  await pgQuery(`
    CREATE TABLE IF NOT EXISTS migrations (
      id VARCHAR(255) PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getExecutedMigrations(): Promise<string[]> {
  try {
    const result = await pgQuery('SELECT id FROM migrations ORDER BY id');
    return result.rows.map((row: any) => row.id);
  } catch (error) {
    // If table doesn't exist, return empty array
    return [];
  }
}

async function executeMigration(migration: Migration) {
  const client = await getClient();
  try {
    const statements = splitStatements(migration.sql)
      .filter(s => !/^\s*BEGIN\s*;?\s*$/i.test(s))
      .filter(s => !/^\s*COMMIT\s*;?\s*$/i.test(s))
      .filter(s => !/^\s*ROLLBACK\s*;?\s*$/i.test(s));

    await client.query('BEGIN');
    for (const stmt of statements) {
      await client.query(stmt);
    }
    // Record migration
    await client.query(
      'INSERT INTO migrations (id, filename) VALUES ($1, $2)',
      [migration.id, migration.filename]
    );
    await client.query('COMMIT');
    console.log(`✅ Migration ${migration.id} executed successfully`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    console.error(`❌ Migration ${migration.id} failed:`, error);
    throw error;
  } finally {
    client.release();
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));

function splitStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inDollar = false;
  let dollarTag = '';
  let dollarDepth = 0;
  let inString = false;
  let stringChar = '';
  let escapeNext = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1] || '';

    if (escapeNext) {
      current += ch;
      escapeNext = false;
      continue;
    }

    if (inDollar) {
      current += ch;
      if (dollarTag === '') {
        if (ch === '$' && next === '$') {
          dollarDepth--;
          if (dollarDepth === 0) {
            inDollar = false;
            dollarTag = '';
          }
        }
      } else if (ch === '$' && sql.slice(i + 1, i + 1 + dollarTag.length) === dollarTag + '$') {
        inDollar = false;
        dollarTag = '';
      }
      continue;
    }

    if (inString) {
      current += ch;
      if (ch === '\\') {
        escapeNext = true;
      } else if (ch === stringChar) {
        inString = false;
      }
      continue;
    }

    if ((ch === '$' && /\$[A-Za-z0-9_]*\$/.test(sql.slice(i))) || (ch === '$' && next === '$')) {
      const m = sql.slice(i).match(/\$([A-Za-z0-9_]*)\$/);
      if (m) {
        inDollar = true;
        dollarTag = m[1];
        current += m[0];
        i += m[0].length - 1;
        if (dollarTag === '') dollarDepth = 1;
        continue;
      }
    }

    if (ch === "'" || ch === '"') {
      inString = true;
      stringChar = ch;
      current += ch;
      continue;
    }

    if (ch === '-' && next === '-') {
      while (i < sql.length && sql[i] !== '\n') {
        current += sql[i];
        i++;
      }
      if (i < sql.length) {
        current += sql[i];
      }
      continue;
    }

    if (ch === ';') {
      statements.push(current.trim());
      current = '';
      continue;
    }

    current += ch;
  }

  const last = current.trim();
  if (last) statements.push(last);
  return statements.filter(s => s.length > 0);
}

function loadMigration(filename: string): Migration {
  const migrationPath = join(__dirname, '../migrations', filename);
  const sql = readFileSync(migrationPath, 'utf8');
  const id = filename.replace('.sql', '');

  return { id, filename, sql };
}

const MIGRATION_LOCK_KEY = 42;

export async function runMigrations() {
  console.log('🔄 Starting database migrations...');
  
  const client = await getClient();
  try {
    // Acquire advisory lock to prevent concurrent migration runs
    await client.query('SELECT pg_advisory_lock($1)', [MIGRATION_LOCK_KEY]);

    // Create migration tracking table
    await createMigrationTable();
    
    // Get executed migrations
    const executed = await getExecutedMigrations();
    console.log(`Already executed migrations: ${executed.join(', ')}`);
    
    // Load available migrations
    const migrationFiles = ['001_computer_core_schema.sql', '002_ai_browser_schema.sql', '003_smart_work_calendar_schema.sql', '004_core_user_schema.sql', '005_ai_computer_os_core.sql', '006_add_invoice_transaction_id.sql', '007_add_daily_usage.sql'];
    const availableMigrations = migrationFiles.map(loadMigration);
    
    // Filter pending migrations
    const pending = availableMigrations.filter(m => !executed.includes(m.id));
    
    if (pending.length === 0) {
      console.log('✅ All migrations are up to date');
      return;
    }
    
    console.log(`📋 Pending migrations: ${pending.map(m => m.id).join(', ')}`);
    
    // Execute pending migrations in order
    for (const migration of pending) {
      await executeMigration(migration);
    }
    
    console.log('🎉 All migrations completed successfully');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [MIGRATION_LOCK_KEY]);
    client.release();
  }
}

export async function rollbackMigration(migrationId: string) {
  console.log(`⏪ Rolling back migration ${migrationId}...`);
  
  try {
    await pgQuery('DELETE FROM migrations WHERE id = $1', [migrationId]);
    console.log(`✅ Migration ${migrationId} rolled back`);
  } catch (error) {
    console.error(`❌ Rollback failed for ${migrationId}:`, error);
    throw error;
  }
}

export async function getMigrationStatus() {
  try {
    await createMigrationTable();
    const executed = await getExecutedMigrations();
    
    const migrationFiles = ['001_computer_core_schema.sql', '002_ai_browser_schema.sql', '003_smart_work_calendar_schema.sql', '004_core_user_schema.sql', '005_ai_computer_os_core.sql', '006_add_invoice_transaction_id.sql', '007_add_daily_usage.sql'];
    const available = migrationFiles.map(f => f.replace('.sql', ''));
    
    return {
      available,
      executed,
      pending: available.filter(id => !executed.includes(id))
    };
  } catch (error) {
    console.error('Failed to get migration status:', error);
    return { available: [], executed: [], pending: [] };
  }
}
