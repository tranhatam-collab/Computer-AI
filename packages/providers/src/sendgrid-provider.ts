import type { EmailProvider, EmailRequest, EmailProviderKind } from "./index.js";

export class SendGridProvider implements EmailProvider {
  readonly kind: EmailProviderKind = "sendgrid";
  readonly configured: boolean;
  private apiKey: string;
  private fromEmail: string;

  constructor(apiKey: string, fromEmail?: string) {
    this.apiKey = apiKey;
    this.fromEmail = fromEmail || process.env.FROM_EMAIL || "noreply@iai.one";
    this.configured = !!apiKey;
  }

  async send(req: EmailRequest): Promise<{ sent: boolean; messageId?: string }> {
    if (!this.configured) {
      throw new Error("SENDGRID_NOT_CONFIGURED");
    }

    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: req.to }] }],
        from: { email: this.fromEmail },
        subject: req.subject,
        content: [
          { type: "text/plain", value: req.body },
          ...(req.html ? [{ type: "text/html", value: req.html }] : []),
        ],
      }),
    });

    if (res.ok) {
      const messageId = res.headers.get("x-message-id") || undefined;
      return { sent: true, messageId };
    }

    const errText = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${errText}`);
  }
}
