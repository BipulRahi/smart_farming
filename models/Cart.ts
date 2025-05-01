import mongoose, { Schema, type Document } from "mongoose"

interface CartItem {
  productId: mongoose.Types.ObjectId
  quantity: number
  price: number
  addedAt: Date
}

export interface ICart extends Document {
  buyerId: mongoose.Types.ObjectId
  items: CartItem[]
  updatedAt: Date
}

const CartSchema: Schema = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
CartSchema.index({ buyerId: 1 })

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)
