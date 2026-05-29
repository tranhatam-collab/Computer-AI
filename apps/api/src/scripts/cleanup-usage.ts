import { pgQuery } from "@iai/database";

async function cleanupOldUsage(days = 90) {
  const result = await pgQuery(
    `DELETE FROM daily_usage WHERE date < CURRENT_DATE - INTERVAL '${days} days'`,
  );
  console.log(`🧹 Cleaned up ${result.rowCount} old daily_usage records older than ${days} days`);
}

const days = Number(process.argv[2]) || 90;

cleanupOldUsage(days)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Cleanup failed:", err);
    process.exit(1);
  });

