import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: 'Nexus',
  description: 'My App',
};

// Viewport আলাদা এক্সপোর্ট করতে হবে
export const viewport = {
  themeColor: '#000000', // ✅ এটা এখন সঠিক জায়গা
  // width: 'device-width', // এগুলোও এখানে রাখা যায় যদি দরকার হয়
  // initialScale: 1,
};

export default function RootLayout({ children }) {
  // বাকি কোড একই থাকবে...
  return (
    <html lang="en">
      <body className="antialiased pb-24 bg-slate-950">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}