import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type StatusPreCadastro, statusCores } from "@/types/enums"
import { UpdateStatusForm } from "@/components/admin/update-status-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PreCadastroPageProps {
  params: {
    id: string
  }
}

export default async function PreCadastroPage({ params }: PreCadastroPageProps) {
  const supabase = createClient()

  // Verificar se o usuário está autenticado e é admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Buscar o perfil do usuário para verificar a role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  // Buscar o pré-cadastro
  const { data: preCadastro, error } = await supabase.from("pre_cadastros").select("*").eq("id", params.id).single()

  if (error || !preCadastro) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm" className="text-gray-900 dark:text-white">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pre-Registration Details</span>
                <Badge className={statusCores[preCadastro.status as StatusPreCadastro] || "bg-gray-500"}>
                  {preCadastro.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="text-lg">
                    {preCadastro.nome} {preCadastro.sobrenome}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CPF</h3>
                  <p className="text-lg">{preCadastro.cpf}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Birth Date</h3>
                  <p className="text-lg">{format(new Date(preCadastro.data_nascimento), "PPP", { locale: ptBR })}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                  <p className="text-lg">{format(new Date(preCadastro.created_at), "PPP", { locale: ptBR })}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Practice Area</h3>
                  <p className="text-lg">{preCadastro.area}</p>
                </div>
                {preCadastro.numero_processo && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Case Number</h3>
                    <p className="text-lg">{preCadastro.numero_processo}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Case Description</h3>
                <div className="p-4 bg-muted rounded-md">
                  {preCadastro.descricao ? (
                    preCadastro.descricao.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-2">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No description provided</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateStatusForm preCadastro={preCadastro} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
