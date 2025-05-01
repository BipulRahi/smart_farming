"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, Wallet } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("farm")

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <DashboardLayout userType="farmer">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farm">Farm Profile</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="farm" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Update your farm details and business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farm-name">Farm Name</Label>
                  <Input id="farm-name" defaultValue="Green Valley Farm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-description">Farm Description</Label>
                  <Textarea
                    id="farm-description"
                    rows={4}
                    defaultValue="Green Valley Farm is a family-owned organic farm specializing in fresh vegetables and herbs. We use sustainable farming practices and no pesticides."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm-email">Business Email</Label>
                    <Input id="farm-email" type="email" defaultValue="contact@greenvalleyfarm.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farm-phone">Business Phone</Label>
                    <Input id="farm-phone" type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-address">Farm Address</Label>
                  <Textarea id="farm-address" defaultValue="123 Rural Road, Farmington, CA 95230" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farm-logo">Farm Logo</Label>
                  <Input id="farm-logo" type="file" accept="image/*" />
                  <p className="text-sm text-muted-foreground">
                    Upload a logo for your farm. Recommended size: 200x200px
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farming Practices</CardTitle>
                <CardDescription>Share information about your farming methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farming-methods">Farming Methods</Label>
                  <Textarea
                    id="farming-methods"
                    rows={4}
                    defaultValue="We use organic farming methods, crop rotation, and natural pest control. Our farm is certified organic and we prioritize sustainability in all our practices."
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="organic-certified">Organic Certified</Label>
                      <p className="text-sm text-muted-foreground">Indicate if your farm is certified organic</p>
                    </div>
                    <Switch id="organic-certified" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pesticide-free">Pesticide Free</Label>
                      <p className="text-sm text-muted-foreground">Indicate if your products are pesticide-free</p>
                    </div>
                    <Switch id="pesticide-free" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gmo-free">GMO Free</Label>
                      <p className="text-sm text-muted-foreground">Indicate if your products are GMO-free</p>
                    </div>
                    <Switch id="gmo-free" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Settings</CardTitle>
                <CardDescription>Manage your wallet and payment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Connected Wallet</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="font-mono text-sm">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-deposit">Auto-deposit payments</Label>
                      <p className="text-sm text-muted-foreground">Automatically deposit payments to your wallet</p>
                    </div>
                    <Switch id="auto-deposit" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="transaction-notifications">Transaction notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for all wallet transactions</p>
                    </div>
                    <Switch id="transaction-notifications" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payout-threshold">Minimum Payout Threshold</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="payout-threshold"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-7"
                      defaultValue="50.00"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Minimum amount required before automatic payout</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  Disconnect Wallet
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View your recent wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">April 29, 2024</p>
                      </div>
                      <p className="font-medium text-green-600">+$24.50</p>
                    </div>
                    <p className="text-sm mt-1">Order #5678 from John Doe</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">April 28, 2024</p>
                      </div>
                      <p className="font-medium text-green-600">+$18.75</p>
                    </div>
                    <p className="text-sm mt-1">Order #5677 from Sarah Williams</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">April 27, 2024</p>
                      </div>
                      <p className="font-medium text-green-600">+$32.00</p>
                    </div>
                    <p className="text-sm mt-1">Order #5676 from Michael Johnson</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-notifications">New Orders</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when you receive new orders</p>
                    </div>
                    <Switch id="order-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-notifications">Payments</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when you receive payments</p>
                    </div>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventory-notifications">Low Inventory</Label>
                      <p className="text-sm text-muted-foreground">
                        Get alerts when your product inventory is running low
                      </p>
                    </div>
                    <Switch id="inventory-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="customer-notifications">New Customers</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when new customers purchase from you
                      </p>
                    </div>
                    <Switch id="customer-notifications" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Smith" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.smith@greenvalleyfarm.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Delete Account</Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
