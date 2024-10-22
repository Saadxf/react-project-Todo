
import { Link } from "react-router-dom";
export function Footer() {
    return (
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
    )
}
