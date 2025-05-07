import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"
import { cookies as nextCookies } from "next/headers"

// Criando um cliente Supabase para componentes do lado do servidor
// Esta função só deve ser usada em componentes do servidor no App Router
export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies: () => nextCookies(),
  })
}
