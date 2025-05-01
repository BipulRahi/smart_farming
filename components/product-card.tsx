"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    unit: string
    images?: [string]
    farmName: string
  }
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative">
        <Image
          src={product.images[0] || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="font-medium">${product.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
          <p className="text-xs text-muted-foreground">{product.farmName}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onAddToCart} className="w-full bg-green-700 hover:bg-green-800">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
