"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ContactContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactContext = createContext<ContactContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ContactContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  return useContext(ContactContext);
}
