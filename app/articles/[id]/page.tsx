import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const supabase = createClient()

  // Buscar o artigo pelo ID
  const { data: article } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      created_at,
      author_id,
      profiles:author_id (email)
    `)
    .eq("id", params.id)
    .single()

  if (!article) {
    notFound()
  }

  // Verificar se o usuário atual é o autor
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAuthor = session?.user.id === article.author_id

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/articles">
            <Button variant="outline" size="sm">
              ← Voltar para Artigos
            </Button>
          </Link>
        </div>

        <article>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <span>Por {article.profiles?.email}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(article.created_at)}</span>
          </div>

          <div className="prose max-w-none">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {isAuthor && (
          <div className="mt-8 flex gap-4">
            <Link href={`/articles/${article.id}/edit`}>
              <Button variant="outline">Editar Artigo</Button>
            </Link>
            <Link href={`/articles/${article.id}/delete`}>
              <Button variant="destructive">Excluir Artigo</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
