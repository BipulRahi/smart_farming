"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,Link2  } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bitcoin, Clock, Download, Link2Icon, Search, ShoppingBag } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
// import { mockProducts } from "@/lib/mock-data";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const ll=()=>{
    console.log(`https://explorer.solana.com/tx/${selectedOrder?.txId}?cluster=devnet`)
  }
  

  const formatOrders = (orders, allProducts) => {
    
    return orders.map((order, index) => {
      const { memo,tx } = order;
      console.log("madarchod",tx)
      const itemsWithDetails = memo.i.map(({ p, q }) => {
        const product = allProducts.find((prod) => prod._id === p);
        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: q,
          image: product.images?.[0] || null,
        };
      });
  
      // Calculate total price
      const total = itemsWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      return {
        id: `ORD-${1000 + index}`,          // Unique order ID
        txId: tx || null,               // Include the transaction ID
        date: new Date().toISOString(),     // Can be changed if real date is available
        status: "processing",
        buyer: memo.B,
        total: parseFloat(total.toFixed(2)),
        items: itemsWithDetails,
      };
    });
  };
  

  // function parseDoubleEncodedMemo(memo: string) {
  //   try {
  //     const once = JSON.parse(memo);     // remove outer quotes
  //     return JSON.parse(once);           // parse actual object
  //   } catch (err) {
  //     console.error("Memo parse failed:", err);
  //     return null;
  //   }
  // }

  function parseMemo(memo: string) {
    try {
      // manually escape malformed outer string if needed
      const cleaned = memo.replace(/\\"/g, '"'); // turn escaped \" into "
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Memo parse failed:", err, memo);
      return null;
    }
  }

  const fetchTransactionMemos = async () => {
    const walletAddress = localStorage.getItem("w"); // make sure it's stored correctly

    if (!walletAddress) {
      console.warn("No wallet found in localStorage.");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await res.json();

      const parsedOrders = data.map((entry: any) => ({
        tx: entry.tx,
        memoRaw: entry.memo,
        memo: parseMemo(entry.memo),
      }));

      console.log(parsedOrders);

      const allItems = parsedOrders
        .map((entry) => entry.memo.i) // Extract 'i' from each order
        .flat();

      // Flatten the array of `i` objects
      // const allItems = parsedOrderss.flat();
      //
      console.log("Flattened Items:", allItems);
      console.log("caaling orderd");
      const response = await fetch("/api/orderd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: allItems }),
      });

      const productsWithQuantity = await response.json();
      // console.log("🛒 Order Items:", productsWithQuantity);

      // console.log("🧾 Memo History:", parsedOrders); // array of { tx, memo }
      // console.log(parseMemo(parseMemo(data)));
      const formatted = formatOrders(parsedOrders, productsWithQuantity);
console.log(formatted);

      setOrders(formatted);
      // Do something with the data (e.g., set to state)
      return data;
    } catch (err) {
      console.error("Error fetching memos:", err);
    }
  };

  useEffect(() => {
    fetchTransactionMemos();
  }, []);

  // Filter orders based on search term, status, and time
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    if (timeFilter === "all") return matchesSearch && matchesStatus;

    const orderDate = new Date(order.date);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)
    );

    if (timeFilter === "last7days" && daysDiff <= 7)
      return matchesSearch && matchesStatus;
    if (timeFilter === "last30days" && daysDiff <= 30)
      return matchesSearch && matchesStatus;
    if (timeFilter === "last3months" && daysDiff <= 90)
      return matchesSearch && matchesStatus;

    return false;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout userType="buyer">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedOrder(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Orders</h1>
        </div>

        {selectedOrder ? (
          <OrderDetails
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last3months">Last 3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No orders found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ||
                      statusFilter !== "all" ||
                      timeFilter !== "all"
                        ? "Try adjusting your filters"
                        : "You haven't placed any orders yet"}
                    </p>
                    <Link href="/dashboard/buyer">
                      <Button className="bg-green-700 hover:bg-green-800">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{formatDate(order.date)}</TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>{order.items.length} items</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function OrderDetails({ order, onBack }: { order: any; onBack: () => void }) {
  console.log(order)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              Order {order.id}
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={()=>{window.open(`https://explorer.solana.com/tx/${order?.txId}?cluster=devnet`,"_blank")}} variant="outline" size="sm">
                {/* <Download  /> */}
                <Link2Icon className="h-4 w-4 mr-2"/>
                Open
              </Button>
              <Button variant="outline" size="sm" onClick={onBack}>
                Back to Orders
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">Order Date</h3>
              <p>
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">Status</h3>
              <p>
                {order.status === "processing" && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    Processing
                  </Badge>
                )}
                {order.status === "shipped" && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    Shipped
                  </Badge>
                )}
                {order.status === "delivered" && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Delivered
                  </Badge>
                )}
                {order.status === "cancelled" && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    Cancelled
                  </Badge>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">Payment Method</h3>
              <p>Wallet Payment</p>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-md bg-muted relative overflow-hidden">
                        <Image
                          src={
                            item.image || "/placeholder.svg?height=48&width=48"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.farmName}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        
        </CardContent>
      </Card>
    </div>
  );
}
