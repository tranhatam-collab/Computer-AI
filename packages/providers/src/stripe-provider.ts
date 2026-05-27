import type { PaymentProvider, PaymentChargeRequest, PaymentChargeResponse, PaymentProviderKind } from "./index.js";

export class StripeProvider implements PaymentProvider {
  readonly kind: PaymentProviderKind = "stripe";
  readonly configured: boolean;
  private secretKey: string;
  private baseUrl = "https://api.stripe.com/v1";

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.configured = !!secretKey;
  }

  async charge(req: PaymentChargeRequest): Promise<PaymentChargeResponse> {
    if (!this.configured) {
      throw new Error("STRIPE_NOT_CONFIGURED");
    }

    const params = new URLSearchParams();
    params.append("amount", String(Math.round(req.amount * 100))); // cents
    params.append("currency", req.currency.toLowerCase());
    params.append("description", req.description);
    if (req.sourceId) {
      params.append("source", req.sourceId);
    }

    const res = await fetch(`${this.baseUrl}/charges`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error?.message || `Stripe error ${res.status}` };
    }

    return {
      success: true,
      transactionId: json.id,
    };
  }
}
