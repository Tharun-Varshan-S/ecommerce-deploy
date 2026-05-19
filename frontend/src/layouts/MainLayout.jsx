import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/layout/MobileBottomNav";

const MainLayout = () => (
  <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
    <Navbar />
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
    <MobileBottomNav />
  </div>
);

export default MainLayout;
