"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface DeleteArticlePageProps {
  params: {
    id: string
  }
}

export default function DeleteArticlePage({ params }: DeleteArticlePageProps) {
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchArticle() {
      const { data: session } = await supabase.auth.getSession()

      if (!session.session) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", params.id)
        .eq("author_id", session.session.user.id)
        .single()

      if (error || !data) {
        router.push("/articles")
        return
      }

      setArticle(data)
      setLoading(false)
    }

    fetchArticle()
  }, [params.id, router, supabase])

  const handleDelete = async () => {
    setDeleting(true)

    try {
      const { error } = await supabase.from("articles").delete().eq("id", params.id)

      if (error) throw error

      toast({
        title: "Artigo excluído com sucesso!",
      })

      router.push("/articles")
    } catch (error: any) {
      toast({
        title: "Erro ao excluir artigo",
        description: error.message,
        variant: "destructive",
      })
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-10 flex justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Excluir Artigo</CardTitle>
            <CardDescription>
              Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{article.title}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Excluindo..." : "Excluir Artigo"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
