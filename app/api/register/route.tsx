import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  await dbConnect()

  const { walletAddress, firstName, lastName, email, role, ...rest } = await req.json()

  if (!walletAddress || !firstName || !lastName || !email || !role) {
    console.log("miss mc")
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const existing = await User.findOne({ walletAddress })
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const user = await User.create({
    walletAddress,
    firstName,
    lastName,
    email,
    role,
    ...rest,
  })

  return NextResponse.json({ message: "User registered", user }, { status: 201 })
}
