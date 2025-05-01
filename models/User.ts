import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  walletAddress: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: "farmer" | "buyer"
  profileImage?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
  // Buyer-specific fields
  favoriteProducts?: mongoose.Types.ObjectId[]
  favoriteFarms?: mongoose.Types.ObjectId[]
  // Farmer-specific fields
  farmId?: mongoose.Types.ObjectId
}

const UserSchema: Schema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,  // Unique index is automatically created for this
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,  // This creates an index automatically
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["farmer", "buyer"],
      required: true,
    },
    profileImage: {
      type: String,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    // Buyer-specific fields
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    favoriteFarms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Farm",
      },
    ],
    // Farmer-specific fields
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
    },
  },
  {
    timestamps: true,
  },
)

// Create an index for role to improve query performance
UserSchema.index({ role: 1 })

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
