
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Header() {
    const auth = useContext(AuthContext);

    return (
        <header className="bg-gray-800 text-white p-6 text-center">
            <h1 className="text-3xl font-bold">Welcome to Todo Manager</h1>
            <nav className="mt-4">
                {
                    auth?.isAuth ? (
                        <Button onClick={auth.signout} asChild>
                            <Link to="/SignIn">Logout</Link>
                        </Button>
                    ) : <Button asChild>
                        <Link to="/SignUp">SignUp</Link>
                    </Button>
                }
                <Link to="/" className="mx-2 text-white hover:text-gray-400">Home</Link>
                <Link to="/" className="mx-2 text-white hover:text-gray-400">Services</Link>
                <Link to="/" className="mx-2 text-white hover:text-gray-400">Contact</Link>
            </nav>
        </header>
    );
}

