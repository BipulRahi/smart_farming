import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ShoppingCart, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">FarmDirect</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            Farm to Table, <span className="text-green-600">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect directly with local farmers or find fresh produce without any middlemen. Fresher food, better
            prices, supporting local agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?type=farmer">
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                I'm a Farmer
              </Button>
            </Link>
            <Link href="/register?type=buyer">
              <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                I'm a Buyer
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Leaf className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>For Farmers</CardTitle>
              <CardDescription>Sell directly to consumers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                List your produce, manage inventory, and track sales all in one place. No middlemen means better margins
                for your farm.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/register?type=farmer" className="w-full">
                <Button className="w-full bg-green-700 hover:bg-green-800">Start Selling</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <ShoppingCart className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>For Buyers</CardTitle>
              <CardDescription>Fresh produce direct from farms</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Browse fresh vegetables and fruits from local farmers. Know exactly where your food comes from and
                support local agriculture.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/register?type=buyer" className="w-full">
                <Button className="w-full bg-green-700 hover:bg-green-800">Start Shopping</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Direct Connection</CardTitle>
              <CardDescription>No third parties involved</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our platform facilitates direct transactions between farmers and buyers. Transparent pricing and secure
                payments through blockchain technology.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500 w-full text-center">
                {/* Web3 integration will be implemented here */}
                Powered by secure blockchain technology
              </p>
            </CardFooter>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p>Sign up as a farmer to sell your produce or as a buyer to purchase fresh vegetables.</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p>Farmers list products, buyers browse and select items they want to purchase.</p>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transact</h3>
              <p>Secure payment processing and delivery coordination for a seamless experience.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6" />
              <h2 className="text-xl font-bold">FarmDirect</h2>
            </div>
            <div className="text-center md:text-right">
              <p>© 2024 FarmDirect. All rights reserved.</p>
              <p className="text-green-200 text-sm">Connecting farmers and buyers directly.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
