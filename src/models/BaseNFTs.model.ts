import mongoose, { Schema, Document } from "mongoose";

export interface BaseNFT extends Document {
    name: string;
    image: string;
    value: number;
    info: string;
}

const baseNFTsSchema = new Schema<BaseNFT>({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    value: {
        type: Number,
    },
    info: {
        type: String,
    }
});

export default mongoose.model("base_nfts", baseNFTsSchema);