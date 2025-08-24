export interface reviewRatingPayload {
  stars?: number;
  comment?: string;
  assetId: string;
  assetType: string;
  reviewer: string;
}

export function validateReviewRequest(body: any): reviewRatingPayload {
  const { stars, comment, assetId, assetType, reviewer } = body;

  if (!assetId || typeof assetId !== "string") {
    throw new Error("assetId is required and must be a string");
  }

  if (!assetType) {
    throw new Error("Asset type is required and must be a string");
  }

  if (!reviewer) {
    throw new Error("Reviewer is required");
  }

  return {
    stars,
    assetId,
    assetType,
    comment,
    reviewer,
  };
}
