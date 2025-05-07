import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

export async function POST(request: NextRequest) {
  const supabase = createClientComponentClient<Database>()
  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/", request.url))
}
