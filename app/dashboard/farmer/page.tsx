"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Plus, Users, DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockProducts } from "@/lib/mock-data"
import { ProductTable } from "@/components/product-table"

export default function FarmerDashboard() {
  const [products, setProducts] = useState(mockProducts.filter((p) => p.farmerId === 1))

  const totalSales = 12450
  const totalProducts = products.length
  const totalCustomers = 48

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  return (
    <DashboardLayout userType="farmer">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Green Valley Farm!</h1>
            <p className="text-muted-foreground">Manage your products and track your sales</p>
          </div>
          <Link href="/dashboard/farmer/products/add">
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 added this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+5 new this month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage your product inventory, update prices, and track stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTable products={products} onDelete={handleDeleteProduct} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Data</Button>
            <Link href="/dashboard/farmer/products/add">
              <Button className="bg-green-700 hover:bg-green-800">Add Product</Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Your most recent orders and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Order #5678</p>
                      <p className="text-sm text-muted-foreground">April 29, 2024</p>
                    </div>
                    <p className="font-medium">$24.50</p>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Organic Tomatoes (2kg), Carrots (1kg)</p>
                    <p className="text-muted-foreground">Customer: John Doe</p>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Order #5677</p>
                      <p className="text-sm text-muted-foreground">April 28, 2024</p>
                    </div>
                    <p className="font-medium">$18.75</p>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Fresh Spinach (1kg), Bell Peppers (500g)</p>
                    <p className="text-muted-foreground">Customer: Sarah Williams</p>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Order #5676</p>
                      <p className="text-sm text-muted-foreground">April 27, 2024</p>
                    </div>
                    <p className="font-medium">$32.00</p>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Potatoes (3kg), Onions (2kg), Garlic (250g)</p>
                    <p className="text-muted-foreground">Customer: Michael Johnson</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/farmer/sales" className="text-sm text-green-600 hover:underline">
                View all sales
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Organic Tomatoes</p>
                      <p className="font-medium">$420</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[85%] rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">85% of total sales</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Fresh Spinach</p>
                      <p className="font-medium">$320</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[65%] rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">65% of total sales</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Bell Peppers</p>
                      <p className="font-medium">$280</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[55%] rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">55% of total sales</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/farmer/analytics" className="text-sm text-green-600 hover:underline">
                View detailed analytics
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
