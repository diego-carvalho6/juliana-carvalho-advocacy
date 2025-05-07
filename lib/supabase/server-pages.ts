import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { Database } from "@/lib/database.types"

// Versão para uso com o Pages Router
export const createServerClient = (
  context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse },
) => {
  return createServerComponentClient<Database>({ cookies: () => context.req.cookies })
}
