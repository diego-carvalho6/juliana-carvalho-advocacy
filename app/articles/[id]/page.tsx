"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Database } from "@/lib/database.types"

export default function ArticlePage() {
  const router = useRouter()
  const params = useParams()
  const [article, setArticle] = useState<any>(null)
  const [isAuthor, setIsAuthor] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function fetchArticle() {
      try {
        if (!params.id) return

        // Buscar o artigo pelo ID
        const { data: article, error } = await supabase
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

        if (error || !article) {
          router.push("/not-found")
          return
        }

        setArticle(article)

        // Verificar se o usuário atual é o autor
        const { data: session } = await supabase.auth.getSession()
        setIsAuthor(session?.session?.user.id === article.author_id)
      } catch (error) {
        console.error("Erro ao buscar artigo:", error)
        router.push("/not-found")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.id, router, supabase])

  if (loading) {
    return <div className="container py-10 flex justify-center">Carregando...</div>
  }

  if (!article) {
    return null
  }

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
            {article.content.split("\n").map((paragraph: string, index: number) => (
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
