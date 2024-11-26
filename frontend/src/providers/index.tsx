import { ProductProvider } from "./product-provider";
import { SessionProvider } from "./session-provider";
import { CartProvider } from "./cart-provider";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </SessionProvider>
  );
}
