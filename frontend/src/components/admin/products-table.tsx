"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, StarOff } from "lucide-react";
import { Product } from "@/types/product";
import Image from "next/image";

export function ProductsTable({
  products,
  handleToggleFeatured,
  handleEdit,
  handleDelete,
}: {
  products: Product[];
  handleToggleFeatured: (product: Product) => void;
  handleEdit: (product: Product) => void;
  handleDelete: (id: string) => Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Product) => (
          <TableRow key={product._id}>
            <TableCell>
              <Image
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded object-cover"
                width={100}
                height={100}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleFeatured(product)}
              >
                {product.featured ? (
                  <Star className="h-4 w-4" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </Button>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      handleEdit(product);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(product._id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
