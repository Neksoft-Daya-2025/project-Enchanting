import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactFloatingButton from "@/components/ContactFloatingButton";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactFloatingButton />
    </div>
  );
}
