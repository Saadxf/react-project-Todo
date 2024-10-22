import { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
    user: User | null;
    isAuth: boolean;
    signin: (user: User) => void;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuth(true);
        }
    }, []);

    const signin = (user: User) => {
        setUser(user);
        setIsAuth(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const signout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuth, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};