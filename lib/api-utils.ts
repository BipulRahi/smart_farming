import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "./db"

// Helper function to handle API errors
export function handleApiError(res: NextApiResponse, error: any) {
  console.error("API Error:", error)

  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    error: message,
  })
}

// Middleware to connect to database
export async function withDatabase(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) {
  try {
    await dbConnect()
    return handler(req, res)
  } catch (error) {
    return handleApiError(res, error)
  }
}

// Middleware to verify wallet authentication
export async function withAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse, userId: string) => Promise<void>,
) {
  try {
    // Get the wallet address from the request headers
    const walletAddress = req.headers.authorization?.split(" ")[1]

    if (!walletAddress) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      })
    }

    // In a real implementation, you would verify the wallet signature
    // For now, we'll just pass the wallet address as the userId

    return handler(req, res, walletAddress)
  } catch (error) {
    return handleApiError(res, error)
  }
}

// Helper function to generate order ID
export function generateOrderId() {
  const prefix = "ORD"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${prefix}-${timestamp}${random}`
}
