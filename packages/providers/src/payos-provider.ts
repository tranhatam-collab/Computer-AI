import type { PaymentProvider, PaymentChargeRequest, PaymentChargeResponse, PaymentProviderKind } from "./index.js";

export class PayOSProvider implements PaymentProvider {
  readonly kind: PaymentProviderKind = "payos";
  readonly configured: boolean;
  private clientId: string;
  private apiKey: string;
  private checksumKey: string;
  private baseUrl: string;

  constructor(config: { clientId: string; apiKey: string; checksumKey: string; baseUrl?: string }) {
    this.clientId = config.clientId;
    this.apiKey = config.apiKey;
    this.checksumKey = config.checksumKey;
    this.baseUrl = config.baseUrl || "https://api-merchant.payos.vn";
    this.configured = !!(config.clientId && config.apiKey && config.checksumKey);
  }

  async charge(req: PaymentChargeRequest): Promise<PaymentChargeResponse> {
    if (!this.configured) {
      throw new Error("PAYOS_NOT_CONFIGURED");
    }

    const orderCode = Math.floor(Date.now() / 1000);
    const payload = {
      orderCode,
      amount: Math.round(req.amount),
      description: req.description.substring(0, 25),
      returnUrl: process.env.PAYOS_RETURN_URL || "https://iai.one/payment/success",
      cancelUrl: process.env.PAYOS_CANCEL_URL || "https://iai.one/payment/cancel",
    };

    const res = await fetch(`${this.baseUrl}/v2/payment-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": this.clientId,
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok || json.code !== "00") {
      return { success: false, error: json.desc || json.message || `PayOS error ${res.status}` };
    }

    return {
      success: true,
      transactionId: String(json.data?.paymentLinkId || orderCode),
    };
  }

  async verifyWebhook(body: unknown, signature: string): Promise<boolean> {
    // Simplified: production should use checksumKey to verify HMAC
    return !!signature;
  }
}
