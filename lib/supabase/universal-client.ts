import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

// Cliente universal que funciona tanto no cliente quanto no servidor
export const createUniversalClient = () => {
  return createClientComponentClient<Database>()
}
