import React, { createContext, useState, useContext, ReactNode } from 'react';

// Models
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type StoreContextType = {
  user: User | null;
  notes: Note[];
  login: (email: string, pass: string) => void;
  signup: (name: string, email: string, pass: string) => void;
  logout: () => void;
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  // Mock Authentication Methods
  const login = (email: string, pass: string) => {
    // In a real app we would validate credentials here
    if (email && pass) {
       setUser({ id: '1', name: 'Divyansh Sharma', email });
    }
  };

  const signup = (name: string, email: string, pass: string) => {
    if (name && email && pass) {
       setUser({ id: '1', name, email });
    }
  };

  const logout = () => {
    setUser(null);
    setNotes([]); // Clear notes on logout
  };

  // Mock Notes CRUD Methods
  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        notes,
        login,
        signup,
        logout,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
