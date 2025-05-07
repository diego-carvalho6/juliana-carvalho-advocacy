import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PreCadastrosTable } from "@/components/admin/pre-cadastros-table"

export default async function AdminDashboardPage() {
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

  // Buscar os pré-cadastros
  const { data: preCadastros } = await supabase
    .from("pre_cadastros")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Pre-Registrations</h2>
          <PreCadastrosTable preCadastros={preCadastros || []} />
        </div>
      </div>
    </div>
  )
}
