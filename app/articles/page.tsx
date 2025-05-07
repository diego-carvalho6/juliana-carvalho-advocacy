import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export default async function ArticlesPage() {
  const supabase = createClient()

  // Buscar todos os artigos
  const { data: articles } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      created_at,
      author_id,
      profiles:author_id (email)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Artigos Jurídicos</h1>
        <Link href="/articles/new">
          <Button>Novo Artigo</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{formatDate(article.created_at)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="line-clamp-3">{article.content.substring(0, 150)}...</p>
              </CardContent>
              <CardFooter>
                <Link href={`/articles/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Ler Artigo
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
