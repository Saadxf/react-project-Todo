import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <h1>header</h1>
            </header>
            <main className="w-full">
                <div className="h-screen flex items-center justify-center">
                    <Outlet />
                </div>
            </main>
            <footer>
                footer @copy
            </footer>
        </>
    )
};
