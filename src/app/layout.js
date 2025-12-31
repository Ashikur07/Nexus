import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Nexus OS",
  description: "Personal Life Operating System",
  manifest: "/manifest.json", // এই লাইনটা মাস্ট!
  themeColor: "#020617",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nexus",
  },
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