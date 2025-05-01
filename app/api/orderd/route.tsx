import {  NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Product from "@/models/Product"
import { NextRequest } from "next/server"

export async function POST(req) {

  await dbConnect()

  try {
    const { items } = await req.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid item list" }, { status: 400 })
    }

    const productIds = items.map((item) => item.p)
    const products = await Product.find({ _id: { $in: productIds } })

    // Merge quantity info from items into products
    const enriched = products.map((product) => {
      const matchingItem = items.find((item) => item.p === product._id.toString())
      return {
        ...product.toObject(),
        quantity: matchingItem?.q || 1,
      }
    })

    return NextResponse.json(enriched)
  } catch (err) {
    console.error("Error resolving order products:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
