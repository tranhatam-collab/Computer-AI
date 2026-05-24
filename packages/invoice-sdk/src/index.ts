import type { ProductId } from "@iai/product-registry";

export interface InvoiceHTML {
  subject: string;
  body: string;
}

export function generateInvoiceEmail(invoiceId: string, productName: string, amount: string, locale: "vi" | "en"): InvoiceHTML {
  const subject = locale === "vi"
    ? `Hóa đơn ${invoiceId} — ${productName}`
    : `Invoice ${invoiceId} — ${productName}`;

  const body = locale === "vi"
    ? `Cảm ơn bạn đã mua ${productName}.\n\nSố hóa đơn: ${invoiceId}\nSố tiền: ${amount}\n\nTrân trọng,\nIAI Computer`
    : `Thank you for purchasing ${productName}.\n\nInvoice: ${invoiceId}\nAmount: ${amount}\n\nBest,\nIAI Computer`;

  return { subject, body };
}

export function sendInvoiceEmail(userEmail: string, invoiceId: string, productName: string, amount: string, locale: "vi" | "en"): void {
  const email = generateInvoiceEmail(invoiceId, productName, amount, locale);
  // In production, this would send via SES/SendGrid/Mailgun
  console.log(`[EMAIL] To: ${userEmail} | Subject: ${email.subject} | Body: ${email.body.substring(0, 100)}...`);
}
