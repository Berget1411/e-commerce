import { Separator } from "@/components/ui/separator";
import CartProduct from "@/components/navbar/cart-product";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

export default function CheckoutProducts({
  cartProducts,
}: {
  cartProducts: any[];
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
                <CartProduct key={product._id} product={product} />
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
