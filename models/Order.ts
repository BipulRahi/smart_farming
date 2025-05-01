import mongoose, { Schema, type Document } from "mongoose"

interface OrderItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
  unit: string
  farmId: mongoose.Types.ObjectId
  farmName: string
}

export interface IOrder extends Document {
  orderId: string
  buyerId: mongoose.Types.ObjectId
  items: OrderItem[]
  totalAmount: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  transactionHash: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  deliveryNotes?: string
  createdAt: Date
  updatedAt: Date
  shippedAt?: Date
  deliveredAt?: Date
}

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unit: {
          type: String,
          required: true,
        },
        farmId: {
          type: Schema.Types.ObjectId,
          ref: "Farm",
          required: true,
        },
        farmName: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionHash: {
      type: String,
      required: true,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    deliveryNotes: {
      type: String,
    },
    shippedAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
OrderSchema.index({ orderId: 1 })
OrderSchema.index({ buyerId: 1 })
OrderSchema.index({ "items.farmId": 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ paymentStatus: 1 })
OrderSchema.index({ createdAt: 1 })

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
