//TODO: figure out if context is required after using proper auth proceedure

// 'use client';
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';
// import { QueryResult, sql } from '@vercel/postgres';
// import { useAuth } from './auth-provider';

// interface UserAccessContextType {
//   access: string | null;
//   setAccess: (access: string) => void;
// }

// const UserAccessContext = createContext<UserAccessContextType | undefined>(
//   undefined,
// );

// interface UserAccessRow {
//   access: string;
// }

// async function getUserAccessLevel(email: string): Promise<string | null> {
//   try {
//     const result: QueryResult<UserAccessRow> =
//       await sql<UserAccessRow>`SELECT access FROM users WHERE email = ${email}`;
//     return result.rows[0]?.access ?? null;
//   } catch (error) {
//     console.error('Failed to fetch user access level:', error);
//     throw new Error('Failed to fetch user access level.');
//   }
// }

// interface UserAccessProviderProps {
//   children: ReactNode;
// }

// export const UserAccessProvider: React.FC<UserAccessProviderProps> = ({
//   children,
// }) => {
//   const { email } = useAuth();
//   const [access, setAccess] = useState<string | null>(null);

//   console.log('email', email);

//   useEffect(() => {
//     if (email) {
//       getUserAccessLevel(email).then((accessLevel) => {
//         setAccess(accessLevel);
//       });
//     }
//   }, [email]);

//   if (!access) {
//     return null; // or loading indicator
//   }

//   return (
//     <UserAccessContext.Provider value={{ access, setAccess }}>
//       {children}
//     </UserAccessContext.Provider>
//   );
// };

// export const useUserAccess = () => {
//   const context = useContext(UserAccessContext);
//   if (context === undefined) {
//     throw new Error('useUserAccess must be used within a UserAccessProvider');
//   }
//   return context;
// };
