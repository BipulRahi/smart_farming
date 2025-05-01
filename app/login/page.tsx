"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Loader2, Wallet } from "lucide-react"
import '@solana/wallet-adapter-react-ui/styles.css'

import dynamic from 'next/dynamic'
import ConnectWalletButton from "@/components/ConnectWalletButton"
import { PublicKey } from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"

// Dynamically import to prevent SSR issues
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { publicKey, disconnect, connected } = useWallet()
  const [userType, setUserType] = useState("buyer")

  const loginUser = async () => {
    if (!publicKey) return;

    setIsLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: publicKey.toBase58() }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        // user exists, redirect to dashboard
        if(userType == data.user.role){
          localStorage.setItem("w", data.user.walletAddress)
          // console.log(data.user)
          localStorage.setItem("user",JSON.stringify(data.user))

          if (userType === "farmer") {
            router.push("/dashboard/farmer")
          } else {
            router.push("/dashboard/buyer")
          }
        }
        else{
          alert(`you are not ${userType}`)
        }

      } else {
        localStorage.removeItem("w")
        disconnect()
        // user not found — stay or go to registration
        alert("Wallet not registered. Please register first.")
        // Optionally redirect to register page:
        // router.push("/register")
      }
      
    } catch (err) {
      console.error("Login error", err)
      alert("Server error")
      localStorage.removeItem("w")
      disconnect()
    } finally {
      setIsLoading(false)
    }
  }

  
  

  const handleWalletConnect = async () => {
    setIsLoading(true)
if(connected && publicKey)
    { loginUser()}

  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">FarmDirect</h1>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome to FarmDirect</CardTitle>
            <CardDescription className="text-center">Connect your wallet to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buyer" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buyer">Buyer</TabsTrigger>
                <TabsTrigger value="farmer">Farmer</TabsTrigger>
              </TabsList>

              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-center text-muted-foreground">
                  {userType === "farmer"
                    ? "Connect your wallet to manage your farm products and track sales"
                    : "Connect your wallet to browse and purchase fresh produce directly from farmers"}
                </p>

               
                  
                    <>
                     <div className="  justify-center item" onClick={handleWalletConnect}>

                         <ConnectWalletButton/>
                     </div>
                    {
                      connected &&    <div className="  justify-center item" onClick={()=>{localStorage.removeItem("w")
                        ;disconnect()}}>
                     
                      Disconnect
                  </div>
                    }
                    </>
                  
                

                <p className="text-xs text-muted-foreground text-center mt-2">
                  By connecting your wallet, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                New to blockchain?{" "}
                <Link href="#" className="text-green-600 hover:underline">
                  Learn how it works
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
