"use client";

import { type ReactNode } from "react";
import { ContactProvider } from "./ContactContext";
import ContactModal from "./ContactModal";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      {children}
      <ContactModal />
    </ContactProvider>
  );
}
