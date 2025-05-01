"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Loader2, Minus, Plus, ShoppingCart, Trash2, Wallet } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockProducts } from "@/lib/mock-data"
// import { useWallet } from "@solana/wallet-adapter-react"
// import { Connection } from "@solana/web3.js"
import {
  Connection,
  PublicKey,
  Transaction
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Make sure styles are imported somewhere globally
require("@solana/wallet-adapter-react-ui/styles.css");


export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { publicKey, sendTransaction,connected } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");


  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart)); // Parse and set the cart items
    } else {
      // If there's no cart in localStorage, you can initialize it with mock data (for testing)
      const initialCart = [
        { ...mockProducts[0], quantity: 2 },
        { ...mockProducts[3], quantity: 1 },
        { ...mockProducts[6], quantity: 3 },
      ];
      setCartItems(initialCart);
      localStorage.setItem('cart', JSON.stringify(initialCart)); // Save initial cart to localStorage
    }
  }, [])

  // Update cart items in localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems])

  const updateQuantity = async(productId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    await updateCartLocalStorage(updatedCart);

  }

  const updateCartLocalStorage = (updatedCartItems) => {
    try {
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  };

  const removeItem = async(productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    await updateCartLocalStorage(updatedCart);

  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }


  const handleSendMemo = async (message) => {
    if (!publicKey) {
      alert("Connect your wallet first!");
      return;
    }

    const memoText =message ;

    const memoProgramId = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

    const memoInstruction = {
      keys: [],
      programId: memoProgramId,
      data: Buffer.from(memoText, "utf8")
    };

    const transaction = new Transaction().add(memoInstruction);

    try {
      const signature = await sendTransaction(transaction, connection);
      console.log("✅ Transaction Signature:", signature);
      
      alert("Memo sent successfully!\nTx Signature: " + signature);
      return signature
    } catch (error) {
      console.error("❌ Error sending transaction:", error);
      alert("Error: " + error.message);
    }
  };




  const handleCheckout = async () => {
    if (!connected || !publicKey) {
      alert("Please reconnect your wallet.");
      return;
    }
  
    setIsLoading(true)
    
    const checkoutData = {
      i: cartItems.map((item) => ({
        p: item._id,
        q: item.quantity,
      })),
      T: getTotalPrice(),
      B: publicKey.toBase58(),
    };
  // console.log(checkoutData)
    
    const memoMessage = JSON.stringify(checkoutData);
  // const sig="4beo7LYjahUj6H7ECJGYJiKr2p5ZjubZyHZMTqDdUr8BuFvoSUoPHVcu8CM7HeQgwwpyvpaqH9u7ev1qytBozKtr"
    try {
      const sig = await handleSendMemo(memoMessage);
     let res= await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: publicKey, 
          txId: sig,
        }),
      })
      const d=res.json()

      console.log("Checkout complete. Memo TX:", sig);
    } catch (e) {
      console.error("Checkout failed", e);
    }
    finally{
      setIsLoading(false)
    }
  };
  


  return (
    <DashboardLayout userType="buyer">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some fresh products to get started</p>
            <Link href="/dashboard/buyer">
              <Button className="bg-green-700 hover:bg-green-800">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                        <div className="h-24 w-24 rounded-md bg-muted relative overflow-hidden flex-shrink-0">
                          <img
                            src={item.images[0] || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} per {item.unit}
                          </p>
                          <p className="text-sm text-muted-foreground">Farm: {item.farmName}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="h-8 w-16 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push("/dashboard/buyer")}>
                    Continue Shopping
                  </Button>
                  <Button variant="destructive" onClick={() => setCartItems([])}>
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Fee</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800 h-12"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Pay with Wallet
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
