import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface CasePageProps {
  params: {
    id: string
  }
}

export default async function CasePage({ params }: CasePageProps) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Buscar o processo pelo ID
  const { data: caseData } = await supabase
    .from("cases")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single()

  if (!caseData) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/cases">
            <Button variant="outline" size="sm">
              ← Voltar para Processos
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Processo: {caseData.case_number}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                <p className="text-lg">{caseData.client_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${
                      caseData.status === "Em andamento"
                        ? "bg-yellow-500"
                        : caseData.status === "Concluído"
                          ? "bg-green-500"
                          : caseData.status === "Arquivado"
                            ? "bg-gray-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <p className="text-lg">{caseData.status}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                <p className="text-lg">{formatDate(caseData.date)}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
              <div className="p-4 bg-muted rounded-md">
                {caseData.description ? (
                  caseData.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-muted-foreground">Sem descrição</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Link href={`/cases/${caseData.id}/edit`}>
            <Button variant="outline">Editar Processo</Button>
          </Link>
          <Link href={`/cases/${caseData.id}/delete`}>
            <Button variant="destructive">Excluir Processo</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
