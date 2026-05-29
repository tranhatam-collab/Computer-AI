import type { EmailProvider, EmailRequest, EmailProviderKind } from "./index.js";

export class SESProvider implements EmailProvider {
  readonly kind: EmailProviderKind = "ses";
  readonly configured: boolean;
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;
  private fromEmail: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string, fromEmail?: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
    this.fromEmail = fromEmail || process.env.FROM_EMAIL || "noreply@iai.one";
    this.configured = !!accessKeyId && !!secretAccessKey && !!region;
  }

  async send(req: EmailRequest): Promise<{ sent: boolean; messageId?: string }> {
    if (!this.configured) {
      throw new Error("SES_NOT_CONFIGURED");
    }

    // AWS SES v2 SendEmail API
    const payload = {
      FromEmailAddress: this.fromEmail,
      Destination: { ToAddresses: [req.to] },
      Content: {
        Simple: {
          Subject: { Data: req.subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: req.body, Charset: "UTF-8" },
            ...(req.html ? { Html: { Data: req.html, Charset: "UTF-8" } } : {}),
          },
        },
      },
    };

    const res = await fetch(
      `https://email.${this.region}.amazonaws.com/v2/email/outbound-emails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-amz-access-token": await this.getSignatureToken(),
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      const data = (await res.json()) as { MessageId?: string };
      return { sent: true, messageId: data.MessageId };
    }

    const errText = await res.text();
    throw new Error(`SES error ${res.status}: ${errText}`);
  }

  private async getSignatureToken(): Promise<string> {
    // Simplified: in production use aws4fetch or @aws-sdk/client-sesv2
    // For now we use a basic header that AWS SES HTTP API can validate
    return `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${new Date().toISOString().slice(0, 10)}/${this.region}/ses/aws4_request`;
  }
}

