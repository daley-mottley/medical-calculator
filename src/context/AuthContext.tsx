import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginAsGuest: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem('fakeUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fakeUser = { name: 'Dr. Fake User', email: 'fakeuser@example.com' };
  const guestUser = { name: 'Guest User', email: 'guest@example.com' };

  const login = async (email: string, password: string) => {
    console.log('Attempting to log in with:', { email, password });
    // Simulate successful login for any credentials
    localStorage.setItem('fakeUser', JSON.stringify(fakeUser));
    setUser(fakeUser);
    console.log('Login successful (fake)');
  };

  const register = async (email: string, password: string) => {
    console.log('Attempting to register with:', { email, password });
    // Simulate successful registration and automatic login
    localStorage.setItem('fakeUser', JSON.stringify(fakeUser));
    setUser(fakeUser);
    console.log('Registration successful (fake)');
  };

  const logout = () => {
    localStorage.removeItem('fakeUser');
    setUser(null);
    console.log('Logout successful (fake)');
  };

  const loginAsGuest = async () => {
    console.log('Attempting to log in as guest');
    // Simulate successful guest login
    localStorage.setItem('fakeUser', JSON.stringify(guestUser)); // Store guest user info
    setUser(guestUser);
    console.log('Guest login successful (fake)');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginAsGuest }}>
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
