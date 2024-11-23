import Link from "next/dist/client/link";

export default function Footer() {
  return (
    <footer className="max-container mt-60 border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">About SoleMates</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-foreground"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/stores"
                className="text-muted-foreground hover:text-foreground"
              >
                Store Locator
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-returns"
                className="text-muted-foreground hover:text-foreground"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Subscribe to get special offers and updates
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </form>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SoleMates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
