-- Migration 007: Add daily_usage table for persistent per-user per-product quota tracking

CREATE TABLE IF NOT EXISTS daily_usage (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  runs_used INTEGER NOT NULL DEFAULT 0,
  output_credits_used INTEGER NOT NULL DEFAULT 0,
  storage_used_mb INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_usage_user ON daily_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_usage_date ON daily_usage(date);

