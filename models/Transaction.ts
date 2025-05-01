import mongoose, { Schema, type Document } from "mongoose"

export interface ITransaction extends Document {
  transactionHash: string
  fromWallet: string
  toWallet: string
  amount: number
  type: "payment" | "refund" | "withdrawal" | "deposit"
  status: "pending" | "completed" | "failed"
  orderId?: mongoose.Types.ObjectId
  description?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

const TransactionSchema: Schema = new Schema(
  {
   
   
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    txs:[ {
      type: String,
    }],
   
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
TransactionSchema.index({ UserId: 1 })


export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema)
