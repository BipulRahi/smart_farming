import mongoose, { Schema, type Document } from "mongoose"

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: "order" | "payment" | "inventory" | "system" | "review"
  title: string
  message: string
  isRead: boolean
  relatedId?: mongoose.Types.ObjectId
  relatedModel?: string
  createdAt: Date
  readAt?: Date
}

const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["order", "payment", "inventory", "system", "review"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
    relatedModel: {
      type: String,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
NotificationSchema.index({ userId: 1 })
NotificationSchema.index({ isRead: 1 })
NotificationSchema.index({ type: 1 })
NotificationSchema.index({ createdAt: 1 })

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
