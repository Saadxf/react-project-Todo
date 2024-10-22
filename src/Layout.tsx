
import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";


export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="w-full flex-grow">
                <div className="flex items-center justify-center p-6">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
