import type { Metadata } from "next";
import { Nunito } from "next/font/google";
const font = Nunito({ subsets: ["latin"] });
import "./globals.css";

import ToastProvider from "@/providers/toast-provider";
import ClerkProvider from "@/providers/clerk-provider";
import Navbar from "@/components/nav/navbar";
import ClientOnly from "@/components/client-only";
import RentModal from "@/components/modals/rent-modal";
import SearchModal from "@/components/modals/search-modal";
import QueryProvider from "@/providers/query-provider";

////

export const metadata: Metadata = {
  title: "Udemy Clone"
};

////

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <ClerkProvider>
            <ToastProvider />
            <ClientOnly>
              <RentModal />
              <SearchModal />
              <Navbar />
            </ClientOnly>
            <div className="pb-20 pt-28">{children}</div>
          </ClerkProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export default Layout;
