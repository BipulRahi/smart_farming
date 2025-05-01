import mongoose, { Schema, type Document } from "mongoose"

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId
  farmId: mongoose.Types.ObjectId
  buyerId: mongoose.Types.ObjectId
  rating: number
  comment: string
  images?: string[]
  isVerifiedPurchase: boolean
  orderId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
ReviewSchema.index({ productId: 1 })
ReviewSchema.index({ farmId: 1 })
ReviewSchema.index({ buyerId: 1 })
ReviewSchema.index({ rating: 1 })

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
