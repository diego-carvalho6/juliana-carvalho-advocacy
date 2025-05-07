import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers" // Este é o problema
import type { Database } from "@/lib/database.types"

// Criando um cliente Supabase para componentes do lado do servidor
export const createClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
