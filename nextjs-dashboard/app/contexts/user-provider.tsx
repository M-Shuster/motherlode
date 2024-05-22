'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { sql } from '@vercel/postgres';
import { User } from '@/app/lib/definitions';
import { useAuth } from './auth-provider';

interface UserAccessContextType {
  access: string | null;
  setAccess: (access: string) => void;
}

const UserAccessContext = createContext<UserAccessContextType | undefined>(
  undefined,
);

const getUserAccessLevel = async (email: string): Promise<string | null> => {
  try {
    console.log('Fetching access level for email:', email);
    const user = await sql<User>`SELECT access FROM users WHERE email=${email}`;
    console.log('User object from database:', user);
    console.log('User access level:', user.rows[0]?.access);
    return user.rows[0]?.access || null;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user access level:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Failed to fetch user access level else block:', error);
    }
    return null;
  }
};

interface UserAccessProviderProps {
  children: ReactNode;
}

export const UserAccessProvider: React.FC<UserAccessProviderProps> = ({
  children,
}) => {
  const { email } = useAuth();
  const [access, setAccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessLevel = async () => {
      try {
        if (email) {
          const fetchedAccess = await getUserAccessLevel(email);
          console.log('email', email);
          console.log('Fetched access level:', fetchedAccess);
          setAccess(fetchedAccess);
        }
      } catch (error) {
        console.error('Failed to fetch user access level:', error);
      }
    };

    fetchAccessLevel();
  }, [email]);

  return (
    <UserAccessContext.Provider value={{ access, setAccess }}>
      {children}
    </UserAccessContext.Provider>
  );
};

export const useUserAccess = () => {
  const context = useContext(UserAccessContext);
  if (context === undefined) {
    throw new Error('useUserAccess must be used within a UserAccessProvider');
  }
  return context;
};
