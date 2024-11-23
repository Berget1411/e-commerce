"use client";

import { ProductsTable } from "@/components/admin/products-table";
import { ProductForm } from "@/components/admin/create-product-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Suspense } from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductTableSkeleton from "@/components/admin/product-table-skeleton";

export default function AdminProducts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { products, isLoading, fetchProducts, updateProduct, deleteProduct } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCloseDialog = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setSelectedProduct(undefined);
  };

  const handleToggleFeatured = async (product: Product) =>
    await updateProduct({ ...product, featured: !product.featured });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => await deleteProduct(id);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      {isLoading ? (
        <ProductTableSkeleton />
      ) : (
        <ProductsTable
          products={products}
          handleToggleFeatured={handleToggleFeatured}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      <ProductForm
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        product={selectedProduct}
      />
    </div>
  );
}
