"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [chartType, setChartType] = useState("sales")

  return (
    <DashboardLayout userType="farmer">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your farm's performance and sales metrics</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245.50</div>
              <p className="text-xs text-green-600">+12% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-green-600">+8% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$25.95</div>
              <p className="text-xs text-green-600">+3% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600">+25% from previous period</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Track your sales and revenue over time</CardDescription>
              </div>
              <Tabs defaultValue="sales" value={chartType} onValueChange={setChartType}>
                <TabsList>
                  <TabsTrigger value="sales" className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    Sales
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Categories
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {chartType === "sales" && (
              <div className="w-full aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Sales Chart Visualization</p>
                  <p className="text-xs text-muted-foreground mt-1">(Chart would be rendered here)</p>
                </div>
              </div>
            )}

            {chartType === "products" && (
              <div className="w-full aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Products Chart Visualization</p>
                  <p className="text-xs text-muted-foreground mt-1">(Chart would be rendered here)</p>
                </div>
              </div>
            )}

            {chartType === "categories" && (
              <div className="w-full aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Categories Chart Visualization</p>
                  <p className="text-xs text-muted-foreground mt-1">(Chart would be rendered here)</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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

                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Carrots</p>
                      <p className="font-medium">$180</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[35%] rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">35% of total sales</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Potatoes</p>
                      <p className="font-medium">$150</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[30%] rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">30% of total sales</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Understand your customer base better</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Customer Retention</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center">
                      <span className="text-lg font-bold">78%</span>
                    </div>
                    <div>
                      <p className="text-sm">78% of your customers are returning customers</p>
                      <p className="text-xs text-green-600">+5% from previous period</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Customer Demographics</h3>
                  <div className="w-full aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Demographics Chart</p>
                      <p className="text-xs text-muted-foreground mt-1">(Chart would be rendered here)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Purchase Frequency</h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 border rounded-lg">
                      <p className="text-lg font-bold">32%</p>
                      <p className="text-xs text-muted-foreground">Weekly</p>
                    </div>
                    <div className="p-2 border rounded-lg">
                      <p className="text-lg font-bold">45%</p>
                      <p className="text-xs text-muted-foreground">Bi-weekly</p>
                    </div>
                    <div className="p-2 border rounded-lg">
                      <p className="text-lg font-bold">18%</p>
                      <p className="text-xs text-muted-foreground">Monthly</p>
                    </div>
                    <div className="p-2 border rounded-lg">
                      <p className="text-lg font-bold">5%</p>
                      <p className="text-xs text-muted-foreground">Occasional</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
