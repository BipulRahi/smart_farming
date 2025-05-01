import mongoose, { Schema, type Document } from "mongoose"

export interface IFarm extends Document {
  name: string
  description: string
  owner: mongoose.Types.ObjectId
  logo?: string
  coverImage?: string
  contactEmail: string
  contactPhone?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  farmingPractices: {
    isOrganic: boolean
    isPesticideFree: boolean
    isGmoFree: boolean
    description: string
  }
  certifications: string[]
  createdAt: Date
  updatedAt: Date
}

const FarmSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    farmingPractices: {
      isOrganic: { type: Boolean, default: false },
      isPesticideFree: { type: Boolean, default: false },
      isGmoFree: { type: Boolean, default: false },
      description: { type: String },
    },
    certifications: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
FarmSchema.index({ name: "text", description: "text" })
FarmSchema.index({ owner: 1 })
FarmSchema.index({ "address.city": 1, "address.state": 1 })

export default mongoose.models.Farm || mongoose.model<IFarm>("Farm", FarmSchema)
