"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

interface ProductTableProps {
  products: any[]
  onDelete: (id: number) => void
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [quickEditProduct, setQuickEditProduct] = useState<any>(null)
  const [quickEditInventory, setQuickEditInventory] = useState<string>("")
  const [quickEditPrice, setQuickEditPrice] = useState<string>("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleQuickEdit = (product: any) => {
    setQuickEditProduct(product)
    setQuickEditInventory(product.inventory.toString())
    setQuickEditPrice(product.price.toString())
  }

  const handleSaveQuickEdit = () => {
    // In a real app, this would update the product in the database
    console.log("Updated product:", {
      id: quickEditProduct.id,
      inventory: Number.parseInt(quickEditInventory),
      price: Number.parseFloat(quickEditPrice),
    })
    setQuickEditProduct(null)
  }

  const confirmDelete = (id: number) => {
    setProductToDelete(id)
  }

  const handleDeleteConfirm = () => {
    if (productToDelete !== null) {
      onDelete(productToDelete)
      setProductToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md bg-muted relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    ${product.price.toFixed(2)} / {product.unit}
                  </TableCell>
                  <TableCell>{product.inventory || "Out of stock"}</TableCell>
                  <TableCell>
                    <Badge variant={product.inventory > 0 ? "default" : "destructive"}>
                      {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleQuickEdit(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Quick Edit
                        </DropdownMenuItem>
                        <Link href={`/dashboard/farmer/products/edit/${product.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Full Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Quick Edit Dialog */}
      <Dialog open={quickEditProduct !== null} onOpenChange={(open) => !open && setQuickEditProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Edit Product</DialogTitle>
            <DialogDescription>Make quick changes to inventory and price</DialogDescription>
          </DialogHeader>

          {quickEditProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted relative overflow-hidden">
                  <Image
                    src={quickEditProduct.image || "/placeholder.svg?height=64&width=64"}
                    alt={quickEditProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{quickEditProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{quickEditProduct.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (${quickEditProduct.unit})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      className="pl-7"
                      value={quickEditPrice}
                      onChange={(e) => setQuickEditPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="inventory" className="text-sm font-medium">
                    Inventory
                  </label>
                  <Input
                    id="inventory"
                    type="number"
                    min="0"
                    value={quickEditInventory}
                    onChange={(e) => setQuickEditInventory(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveQuickEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={productToDelete !== null} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
