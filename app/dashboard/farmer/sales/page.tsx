"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, Search, ShoppingBag } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { cn } from "@/lib/utils"

// Mock sales data
const mockSales = [
  {
    id: "ORD-5678",
    date: "2024-04-29T14:30:00Z",
    customer: "John Doe",
    status: "completed",
    total: 24.5,
    items: [
      { id: 1, name: "Organic Tomatoes", quantity: 2, price: 3.99 },
      { id: 3, name: "Bell Peppers", quantity: 1, price: 4.99 },
    ],
  },
  {
    id: "ORD-5677",
    date: "2024-04-28T10:15:00Z",
    customer: "Sarah Williams",
    status: "completed",
    total: 18.75,
    items: [
      { id: 2, name: "Fresh Spinach", quantity: 1, price: 2.49 },
      { id: 3, name: "Bell Peppers", quantity: 2, price: 4.99 },
    ],
  },
  {
    id: "ORD-5676",
    date: "2024-04-27T16:45:00Z",
    customer: "Michael Johnson",
    status: "completed",
    total: 32.0,
    items: [
      { id: 8, name: "Carrots", quantity: 3, price: 1.99 },
      { id: 9, name: "Potatoes", quantity: 2, price: 2.49 },
      { id: 10, name: "Fresh Basil", quantity: 1, price: 1.99 },
    ],
  },
  {
    id: "ORD-5675",
    date: "2024-04-25T09:20:00Z",
    customer: "Emily Davis",
    status: "processing",
    total: 45.25,
    items: [
      { id: 1, name: "Organic Tomatoes", quantity: 2, price: 3.99 },
      { id: 2, name: "Fresh Spinach", quantity: 3, price: 2.49 },
      { id: 8, name: "Carrots", quantity: 1, price: 1.99 },
    ],
  },
  {
    id: "ORD-5674",
    date: "2024-04-23T11:10:00Z",
    customer: "Robert Wilson",
    status: "completed",
    total: 29.95,
    items: [
      { id: 1, name: "Organic Tomatoes", quantity: 1, price: 3.99 },
      { id: 3, name: "Bell Peppers", quantity: 2, price: 4.99 },
      { id: 10, name: "Fresh Basil", quantity: 1, price: 1.99 },
    ],
  },
]

export default function SalesPage() {
  const [sales, setSales] = useState(mockSales)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Filter sales based on search term, status, and date
  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || sale.status === statusFilter

    const matchesDate = !date || format(new Date(sale.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Shipped
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTotalSales = () => {
    return filteredSales.reduce((total, sale) => total + sale.total, 0)
  }

  return (
    <DashboardLayout userType="farmer">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Sales Management</h1>
            <p className="text-muted-foreground">Track and manage your sales and orders</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Sales Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalSales().toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{filteredSales.length} orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${filteredSales.length > 0 ? (getTotalSales() / filteredSales.length).toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Organic Tomatoes</div>
              <p className="text-xs text-muted-foreground">12 units sold</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Sales History
            </CardTitle>
            <CardDescription>View and manage all your sales and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    me="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full md:w-[180px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                {date && (
                  <Button variant="ghost" size="icon" onClick={() => setDate(undefined)}>
                    <span className="sr-only">Clear date</span>
                    &times;
                  </Button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No sales found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{getStatusBadge(sale.status)}</TableCell>
                        <TableCell>{sale.items.length} items</TableCell>
                        <TableCell className="text-right">${sale.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
