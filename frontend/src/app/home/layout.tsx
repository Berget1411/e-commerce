import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-container px-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
