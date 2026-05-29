import { runMigrations } from "@iai/database";

async function main() {
  try {
    await runMigrations();
    console.log("Migration completed.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
