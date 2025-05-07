"use server"

import { createClient } from "@/lib/supabase/server"
import type { StatusPreCadastro } from "@/types/enums"
import { revalidatePath } from "next/cache"

export async function updatePreCadastroStatus(id: string, status: StatusPreCadastro) {
  try {
    const supabase = createClient()

    // Verificar se o usuário está autenticado e é admin
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    // Buscar o perfil do usuário para verificar a role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (!profile || profile.role !== "admin") {
      return { success: false, error: "Not authorized" }
    }

    // Atualizar o status do pré-cadastro
    const { error } = await supabase.from("pre_cadastros").update({ status }).eq("id", id)

    if (error) {
      throw new Error(error.message)
    }

    // Revalidar as páginas
    revalidatePath(`/admin/pre-cadastros/${id}`)
    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
