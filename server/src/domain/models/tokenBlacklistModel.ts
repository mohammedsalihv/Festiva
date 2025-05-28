import mongoose, { Schema, Document } from "mongoose";

export interface ITokenBlacklist extends Document {
  token: string;
  blacklistedAt: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
  token: { type: String, required: true },
  blacklistedAt: { type: Date, default: Date.now },
});

export const TokenBlacklistModel = mongoose.model<ITokenBlacklist>(
  "TokenBlacklist",
  TokenBlacklistSchema
);
