import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

// Versão segura que não usa next/headers
// Pode ser usada em qualquer lugar, mas não tem acesso aos cookies do servidor
export const createServerSafeClient = () => {
  return createClientComponentClient<Database>()
}
