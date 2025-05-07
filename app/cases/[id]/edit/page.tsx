import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CaseForm } from "../../new/case-form"

interface EditCasePageProps {
  params: {
    id: string
  }
}

export default async function EditCasePage({ params }: EditCasePageProps) {
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
      <h1 className="text-3xl font-bold mb-6">Editar Processo</h1>
      <CaseForm userId={session.user.id} caseData={caseData} />
    </div>
  )
}
