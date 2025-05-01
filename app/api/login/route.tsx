import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  await dbConnect()

  const { walletAddress } = await req.json()

  if (!walletAddress) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
  }

  const user = await User.findOne({ walletAddress })

  if (!user) {
    return NextResponse.json({ message: "User not found", needsRegistration: true}, { status: 404 })
  }

  return NextResponse.json({ message: "Login successful", user,success:true  })
}
