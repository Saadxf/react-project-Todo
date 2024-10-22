import { createContext, useState, PropsWithChildren } from "react";


type ThemeType = {
    theme: "light" | "dark";
}
interface Theme {
    theme: ThemeType | undefined;
    changeTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<Theme | undefined>(undefined);
export const ThemeProvider = ({ children }: PropsWithChildren) => {

    const [theme, setTheme] = useState<ThemeType>({ theme: 'light' });

    const changeTheme = (newTheme: ThemeType) => {
        localStorage.setItem('theme', newTheme.theme);
        setTheme({ theme: newTheme.theme });
    };
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>           
            {children}
        </ThemeContext.Provider>
    );
};

