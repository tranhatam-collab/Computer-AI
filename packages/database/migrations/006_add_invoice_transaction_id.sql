-- Migration 006: Add transaction_id to invoices for payment gateway tracking

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS transaction_id TEXT;

CREATE INDEX IF NOT EXISTS idx_invoices_transaction_id ON invoices(transaction_id);
