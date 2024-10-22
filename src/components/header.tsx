
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeContext } from "@/context/ThemeContext";

export function Header() {
    const auth = useContext(AuthContext);
    const themes = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.toggle("dark");
    }, [themes]);

    return (
        <div className="flex w-full flex-col ">
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
                <Button onClick={() => themes?.changeTheme({ theme: themes?.theme ?? 'dark' ? 'light' : 'dark' })} className="flex">Change Theme</Button>
            </header>
        </div>
    );
}

