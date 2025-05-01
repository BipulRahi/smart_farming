import { NextRequest } from "next/server"
import Transaction from "@/models/Transaction"
import User from "@/models/User"
import dbConnect from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const { publicKey, txId } = body
    // console.log(publicKey,txId)
    if (!publicKey || !txId) {
      return new Response(JSON.stringify({ error: "Missing publicKey or txId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }


    // 🔍 Find the user by wallet address
    const user = await User.findOne({ walletAddress: publicKey })
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    // 📦 Save txId under this user's Transaction document
    const record = await Transaction.findOneAndUpdate(
      { UserId: user._id },
      { $addToSet: { txs: txId } },
      { upsert: true, new: true }
    )

    return new Response(JSON.stringify({ success: true, transaction: record }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("❌ Error saving transaction:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
