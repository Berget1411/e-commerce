import { Separator } from "@/components/ui/separator";
import CartProduct from "@/components/navbar/cart-product";
import { Product as ProductType } from "@/types/product";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

type CartProduct = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CheckoutProducts({
  cartProducts,
}: {
  cartProducts: CartProduct[];
}) {
  return (
    <Card className="w-2/3 max-md:w-full">
      <CardHeader>
        <CardTitle className="mb-2">Checkout</CardTitle>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent>
        {cartProducts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cartProducts.map((product) => (
              <div key={product._id}>
                <CartProduct
                  key={product._id}
                  product={product as ProductType}
                />
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
