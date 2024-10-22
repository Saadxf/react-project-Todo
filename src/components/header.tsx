
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeContext } from "@/context/ThemeContext";
import { useAuthStore } from "@/store";

export function Header() {
    const auth = useAuthStore((state) => state.isAuth);
    const user = useAuthStore((state) => state.user);
    const signout = useAuthStore((state) => state.signout)
    const themes = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.toggle("dark");
    }, [themes]);

    return (
        <div className="flex w-full flex-col ">
            <header className="bg-gray-800 text-white p-6 text-center">
                <h1 className="text-3xl font-bold">{auth ? `Welcome ${user?.name}` : `Welocome to Todo manger`}</h1>
                <nav className="mt-4">
                    {
                        auth ? (
                            <Button onClick={() => signout} asChild>
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

