import mongoose, { Schema, type Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  unit: string
  category: string
  inventory: number
  images: string[]
  farmId: mongoose.Types.ObjectId
  isOrganic: boolean
  isPesticideFree: boolean
  isGmoFree: boolean
  harvestDate?: Date
  expiryDate?: Date
  nutritionalInfo?: string
  status: "active" | "out_of_stock" | "archived"
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      // required:true,
    },
    description: {
      type: String,
      // required:true,
    },
    price: {
      type: Number,
      // required:true,
      min: 0,
    },
    unit: {
      type: String,
      // required:true,
    },
    category: {
      type: String,
      // required:true,
      // index: true,
    },
    inventory: {
      type: Number,
      // required:true,
      min: 0,
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required:true,
    },
    isOrganic: {
      type: Boolean,
      default: true,
    },
    isPesticideFree: {
      type: Boolean,
      default: true,
    },
    isGmoFree: {
      type: Boolean,
      default: true,
    },
    harvestDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    nutritionalInfo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "out_of_stock", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for faster queries
ProductSchema.index({ name: "text", description: "text" })
ProductSchema.index({ farmId: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ status: 1 })

// Virtual for checking if product is in stock
ProductSchema.virtual("inStock").get(function (this: IProduct) {
  return this.inventory > 0
})

// Middleware to update status based on inventory
ProductSchema.pre("save", function (this: IProduct, next) {
  if (this.inventory <= 0 && this.status !== "archived") {
    this.status = "out_of_stock"
  } else if (this.inventory > 0 && this.status === "out_of_stock") {
    this.status = "active"
  }
  next()
})

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
