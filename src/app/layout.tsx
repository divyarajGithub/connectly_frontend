import "./globals.css";
import Providers from "./Providers/Provider";
import Layout from "@/Components/Layouts/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}