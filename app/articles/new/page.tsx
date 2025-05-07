import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArticleForm } from "./article-form"

export default async function NewArticlePage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Novo Artigo</h1>
      <ArticleForm userId={session.user.id} />
    </div>
  )
}
