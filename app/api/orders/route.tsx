import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Transaction from "@/models/Transaction"
import { Connection, clusterApiUrl } from "@solana/web3.js"

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json()

    if (!walletAddress) {
      return new Response(JSON.stringify({ error: "Wallet address is required" }), { status: 400 })
    }

    await dbConnect()

    // 1. Find user by wallet
    const user = await User.findOne({ walletAddress })
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    // 2. Get transaction IDs
    const txRecord = await Transaction.findOne({ UserId: user._id })
    if (!txRecord || !txRecord.txs || txRecord.txs.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 })
    }

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    const result = []

    for (const txId of txRecord.txs) {
      try {
        const txDetails = await connection.getTransaction(txId);

        let memoText = null

        if (txDetails?.meta && txDetails?.meta?.logMessages) {
          for (const log of txDetails.meta.logMessages) {
            const match = log.match(/Memo \(len \d+\): "(.*)"/)
            if (match) {
              memoText = match[1]
              break
            }
          }
        }

        result.push({ tx: txId, memo: memoText })
      } catch (err) {
        result.push({ tx: txId, memo: null, error: "Failed to fetch transaction" })
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Error in /transactions/memos:", err)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}
