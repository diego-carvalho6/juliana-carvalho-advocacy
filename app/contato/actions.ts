"use server"

import { createClient } from "@/lib/supabase/server"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { revalidatePath } from "next/cache"

export async function createPreCadastro(formData: ContactFormValues) {
  try {
    // Validar os dados do formulário
    const validatedData = contactFormSchema.parse(formData)

    // Formatar a data para o formato ISO
    const formattedDate = validatedData.dataNascimento.toISOString().split("T")[0]

    // Criar cliente Supabase
    const supabase = createClient()

    // Inserir dados na tabela pre_cadastros
    const { data, error } = await supabase
      .from("pre_cadastros")
      .insert({
        nome: validatedData.nome,
        sobrenome: validatedData.sobrenome,
        cpf: validatedData.cpf,
        data_nascimento: formattedDate,
        numero_processo: validatedData.numeroProcesso || null,
        descricao: validatedData.descricao || null,
        area: validatedData.area,
      })
      .select()

    if (error) {
      throw new Error(error.message)
    }

    // Revalidar a página para atualizar os dados
    revalidatePath("/contato")

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
