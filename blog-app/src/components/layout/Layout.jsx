import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <NavBar />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
