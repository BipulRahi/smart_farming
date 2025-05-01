"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Clock, Plus, Minus } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

export default function BuyerDashboard() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [loading,setloading]=useState(false)


    // Fetch products from API
    const fetchProducts = async () => {
      setloading(true)
      try {
        const response = await fetch("/api/prod"); // Replace with your actual API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setloading(false)
    };
  
    // Add product to cart
    const addToCart = async (product) => {
      const existingItem = cartItems.find((item) => item.id === product.id);
      let updatedCartItems;
  
      if (existingItem) {
        updatedCartItems = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      
      } else {
        updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      }
  
      // Sync updated cart with backend
      await updateCartLocalStorage(updatedCartItems);
  
      setCartItems(updatedCartItems);
    };
  
    // Remove product from cart
    const removeFromCart = async (productId) => {
      const existingItem = cartItems.find((item) => item.id === productId);
      let updatedCartItems;
  
      if (existingItem && existingItem.quantity > 1) {
        updatedCartItems = cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCartItems = cartItems.filter((item) => item.id !== productId);
      }
  
      // Sync updated cart with backend
      await updateCartLocalStorage(updatedCartItems);
  
      
    };
  
   // Update cart in localStorage
const updateCartLocalStorage = (updatedCartItems) => {
  try {
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

  
    // Calculate total price of cart
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    // Filter products based on search and category
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  
    const getCartFromLocalStorage = () => {
      try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : []; // Return an empty array if no cart exists
      } catch (error) {
        console.error("Failed to retrieve cart from localStorage:", error);
        return [];
      }
    };

    useEffect(() => {
      fetchProducts();
      setCartItems(getCartFromLocalStorage())
       // Fetch products when the component mounts
    }, []);





  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("/api/products"); // Replace with your actual API endpoint
  //     const data = await response.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Failed to fetch products:", error);
  //   }
  // };


  // const filteredProducts = products.filter((product) => {
  //   const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesCategory = category === "all" || product.category === category
  //   return matchesSearch && matchesCategory
  // })

  // const addToCart = (product: any) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id)

  //   if (existingItem) {
  //     setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }])
  //   }
  // }

  // const removeFromCart = (productId: number) => {
  //   const existingItem = cartItems.find((item) => item.id === productId)

  //   if (existingItem && existingItem.quantity > 1) {
  //     setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)))
  //   } else {
  //     setCartItems(cartItems.filter((item) => item.id !== productId))
  //   }
  // }

  // const getTotalPrice = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  // }

  return (
    <DashboardLayout userType="buyer">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
           
           <h1 className="text-2xl font-bold">
                      Welcome, {" "}
                      {(() => {
                        const user = localStorage.getItem("user");
                        if (user) {
                          const parsedUser = JSON.parse(user);
                          return parsedUser?.firstName ?? "Guest"; // Provide a default value if `firstName` doesn't exist
                        }
                        return "Guest";
                      })()}
                    </h1>{" "}
            <p className="text-muted-foreground">Browse fresh produce directly from local farmers</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </div>
          </div>
        </div>

       {loading ? <div>Loading</div> :  <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                      <TabsTrigger value="fruits">Fruits</TabsTrigger>
                      <TabsTrigger value="dairy">Dairy</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-muted-foreground">No products found matching your criteria</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">Add some fresh products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-12 rounded-md bg-green-100 relative overflow-hidden">
                            <img
                              src={item.images[0] || "/placeholder.svg?height=48&width=48"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price} per {item.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => addToCart(item)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-700 hover:bg-green-800" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                  {/* Web3 payment integration would be implemented here */}
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Order #1234</p>
                        <p className="text-sm text-muted-foreground">April 28, 2024</p>
                      </div>
                      <Badge>Delivered</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>5 items • $34.50</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Order #1233</p>
                        <p className="text-sm text-muted-foreground">April 21, 2024</p>
                      </div>
                      <Badge>Delivered</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>3 items • $22.75</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/buyer/orders"
                    className="text-sm text-green-600 hover:underline block text-center"
                  >
                    View all orders
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}
      </div>
    </DashboardLayout>
  )
}
