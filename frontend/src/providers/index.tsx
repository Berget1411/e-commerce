import { ProductProvider } from "./product-provider";
import { SessionProvider } from "./session-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProductProvider>{children}</ProductProvider>
    </SessionProvider>
  );
}
