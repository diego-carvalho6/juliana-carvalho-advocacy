import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArticleForm } from "../../new/article-form"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Buscar o artigo pelo ID
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .eq("author_id", session.user.id)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Artigo</h1>
      <ArticleForm userId={session.user.id} article={article} />
    </div>
  )
}
