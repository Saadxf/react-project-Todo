import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-6 text-center">
                <h1 className="text-3xl font-bold">Welcome to Todo Manager</h1>
                <nav className="mt-4">
                    <Link to="/" className="mx-2 text-white hover:text-gray-400">Home</Link>
                    <Link to="/SignIn" className="mx-2 text-white hover:text-gray-400">Login</Link>
                    <Link to="/" className="mx-2 text-white hover:text-gray-400">Services</Link>
                    <Link to="/" className="mx-2 text-white hover:text-gray-400">Contact</Link>
                </nav>
            </header>
            <main className="w-full flex-grow">
                <div className="flex items-center justify-center">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-6 text-center">
                <div className="container mx-auto">
                    <p className="mb-4">© 2024 My Todo. All rights reserved.</p>
                    <nav>
                        <Link to="/" className="mx-2 text-white hover:text-gray-400">Privacy Policy</Link>
                        <Link to="/" className="mx-2 text-white hover:text-gray-400">Terms of Service</Link>
                        <Link to="/" className="mx-2 text-white hover:text-gray-400">Contact Us</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
 