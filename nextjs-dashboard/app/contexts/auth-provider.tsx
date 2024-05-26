//TODO: figure out if context is required after using proper auth proceedure

// 'use client';
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';

// interface AuthContextType {
//   email: string | null;
//   setEmail: (email: string) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [email, setEmail] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       const userEmail = 'master@mail.com'; // Replace with actual email fetching logic
//       setEmail(userEmail);
//     };

//     fetchUserEmail();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ email, setEmail }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
