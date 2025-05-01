"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Home,
  Leaf,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "farmer" | "buyer"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const farmerNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/farmer",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/dashboard/farmer/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Sales",
      href: "/dashboard/farmer/sales",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/farmer/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Customers",
      href: "/dashboard/farmer/customers",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  const buyerNavItems = [
    {
      title: "Marketplace",
      href: "/dashboard/buyer",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "My Orders",
      href: "/dashboard/buyer/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Cart",
      href: "/dashboard/buyer/cart",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Favorite Farms",
      href: "/dashboard/buyer/favorites",
      icon: <Leaf className="h-5 w-5" />,
    },
  ]

  const navItems = userType === "farmer" ? farmerNavItems : buyerNavItems

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-green-800">FarmDirect</span>
              </Link>
              <div className="grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 ${
                      pathname === item.href ? "text-green-700 font-semibold" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 mt-auto">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-green-800">FarmDirect</span>
        </Link>
        <div className="flex-1"></div>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">User account</span>
        </Button>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <div className="py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {userType === "farmer" ? "Farmer Dashboard" : "Buyer Dashboard"}
              </h2>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-4 py-2 ${
                      pathname === item.href
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Account</h2>
              <div className="space-y-1">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
