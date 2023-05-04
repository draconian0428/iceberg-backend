import mongoose, { Schema, Document } from "mongoose";

export interface BaseNFT extends Document {
  bId: Schema.Types.ObjectId,
  name: string;
  value: number;
  info: string;
}

const baseNFTsSchema = new Schema<BaseNFT>({
  bId: {
    type: Schema.Types.ObjectId,
    ref: 'base_nfts',
    required: [true, 'BId is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
  },
  info: {
    type: String,
    required: [true, 'Info is required'],
  }
});

export const myNFTCollection = (uName: string) => {
  return mongoose.model(uName, baseNFTsSchema);
}
