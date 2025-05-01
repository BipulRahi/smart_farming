// app/api/products/route.ts
import  Product  from "@/models/Product"
import User  from "@/models/User"
import dbConnect from "@/lib/db"

export async function POST(req: Request) {
  await dbConnect()

  try {
    const body = await req.json()
    const { wallet, name, description, price, unit, category, inventory, imageUrl } = body

    if (!wallet) {
      return new Response(JSON.stringify({ error: "Wallet address required" }), { status: 400 })
    }
    if (!imageUrl) {
      
      return new Response(JSON.stringify({ error: "Image URL is required" }), { status: 400 })
    }

    const farmer = await User.findOne({ walletAddress: wallet })
    if (!farmer) {
      return new Response(JSON.stringify({ error: "Farmer not found" }), { status: 404 })
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      unit,
      category,
      inventory,
      farmId: farmer._id,
      images:[imageUrl],
    })

    return new Response(JSON.stringify({ success: true, product: newProduct }), { status: 201 })
  } catch (error) {
    console.error("Error adding product:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}
