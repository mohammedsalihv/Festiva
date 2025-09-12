
export interface PaymentRequestDTO {
  payerId: string;
  assetId: string;
  platformFee: number;
  amount: number;
  currency: string;
}

export function validatePaymentRequest(body: any): PaymentRequestDTO {
  const { payerId, assetId, platformFee, amount, currency } = body;

  if (!payerId || typeof payerId !== "string") {
    throw new Error("payerId is required and must be a string");
  }

  if (!assetId || typeof assetId !== "string") {
    throw new Error("assetId is required and must be a string");
  }

  if (typeof platformFee !== "number" || platformFee < 0) {
    throw new Error("platformFee must be a non-negative number");
  }

  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }

  if (!currency || typeof currency !== "string") {
    throw new Error("Currency is required and must be a string");
  }

  return {
    payerId,
    assetId,
    platformFee,
    amount,
    currency,
  };
}
