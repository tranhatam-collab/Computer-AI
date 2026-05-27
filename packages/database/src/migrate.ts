import { readFileSync } from 'fs';
import { join } from 'path';
import { pgQuery } from './connection';

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
  try {
    await pgQuery('BEGIN');
    
    // Execute migration SQL
    await pgQuery(migration.sql);
    
    // Record migration
    await pgQuery(
      'INSERT INTO migrations (id, filename) VALUES ($1, $2)',
      [migration.id, migration.filename]
    );
    
    await pgQuery('COMMIT');
    console.log(`✅ Migration ${migration.id} executed successfully`);
    return true;
  } catch (error) {
    await pgQuery('ROLLBACK');
    console.error(`❌ Migration ${migration.id} failed:`, error);
    throw error;
  }
}

function loadMigration(filename: string): Migration {
  const migrationPath = join(__dirname, '../migrations', filename);
  const sql = readFileSync(migrationPath, 'utf8');
  const id = filename.replace('.sql', '');
  
  return { id, filename, sql };
}

export async function runMigrations() {
  console.log('🔄 Starting database migrations...');
  
  try {
    // Create migration tracking table
    await createMigrationTable();
    
    // Get executed migrations
    const executed = await getExecutedMigrations();
    console.log(`Already executed migrations: ${executed.join(', ')}`);
    
    // Load available migrations
    const migrationFiles = ['002_ai_browser_schema.sql', '003_smart_work_calendar_schema.sql'];
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
    
    const migrationFiles = ['002_ai_browser_schema.sql', '003_smart_work_calendar_schema.sql'];
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
