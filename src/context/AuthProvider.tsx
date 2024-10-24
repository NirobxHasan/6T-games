import { createContext } from 'react';
import useAuthService from '../hooks/useAuthService';

interface AppContextInterface {
    loginError: string;
}
export const AuthContext = createContext<any>({});

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const allContext = useAuthService();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
