import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Nexus",
  description: "My Personal Life Operating System",
  manifest: "/manifest.json", 
  // PWA setup পরে করবো, আগে UI সাজাই
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased pb-24"> 
        {/* pb-24 দেওয়া হয়েছে যাতে কন্টেন্ট নেভিগেশনের নিচে না ঢাকা পড়ে */}
        {children}
        <BottomNav />
      </body>
    </html>
  );
}