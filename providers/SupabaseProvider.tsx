"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() => createClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
