"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createUniversalClient } from "@/lib/supabase/universal-client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, FolderIcon } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [articlesCount, setArticlesCount] = useState<number>(0)
  const [casesCount, setCasesCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const supabase = createUniversalClient()

  useEffect(() => {
    async function fetchData() {
      try {
        // Verificar se o usuário está autenticado
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
          router.push("/login")
          return
        }

        setSession(data.session)

        // Buscar contagem de artigos do usuário
        const { count: articlesCount } = await supabase
          .from("articles")
          .select("*", { count: "exact", head: true })
          .eq("author_id", data.session.user.id)

        // Buscar contagem de processos do usuário
        const { count: casesCount } = await supabase
          .from("cases")
          .select("*", { count: "exact", head: true })
          .eq("user_id", data.session.user.id)

        setArticlesCount(articlesCount || 0)
        setCasesCount(casesCount || 0)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, supabase])

  if (loading) {
    return <div className="container py-10">Carregando...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meus Artigos</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesCount}</div>
            <p className="text-xs text-muted-foreground">Artigos publicados</p>
            <div className="mt-4">
              <Link href="/articles/new">
                <Button size="sm">Novo Artigo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meus Processos</CardTitle>
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{casesCount}</div>
            <p className="text-xs text-muted-foreground">Processos cadastrados</p>
            <div className="mt-4">
              <Link href="/cases/new">
                <Button size="sm">Novo Processo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/articles">
            <Button variant="outline" className="w-full justify-start">
              <BookOpenIcon className="mr-2 h-4 w-4" />
              Ver Todos os Artigos
            </Button>
          </Link>
          <Link href="/articles/new">
            <Button variant="outline" className="w-full justify-start">
              <BookOpenIcon className="mr-2 h-4 w-4" />
              Criar Novo Artigo
            </Button>
          </Link>
          <Link href="/cases">
            <Button variant="outline" className="w-full justify-start">
              <FolderIcon className="mr-2 h-4 w-4" />
              Ver Todos os Processos
            </Button>
          </Link>
          <Link href="/cases/new">
            <Button variant="outline" className="w-full justify-start">
              <FolderIcon className="mr-2 h-4 w-4" />
              Cadastrar Novo Processo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
