// app/api/products/route.js
import dbConnect from "@/lib/db";
import Product from "@/models/Product"

export async function GET() {
  try {
    await dbConnect();
      const products = await Product.find({})
    // console.log(products)
    // const products = await db.collection("products").find({}).toArray();
    
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
}
