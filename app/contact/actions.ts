"use server"

import { createClient } from "@/lib/supabase/server"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { StatusPreCadastro } from "@/types/enums"
import { revalidatePath } from "next/cache"

export async function createPreCadastro(formData: ContactFormValues) {
  try {
    // Validar os dados do formulário
    const validatedData = contactFormSchema.parse(formData)

    // Formatar a data para o formato ISO
    const formattedDate = validatedData.dataNascimento.toISOString().split("T")[0]

    // Criar cliente Supabase
    const supabase = createClient()

    // Verificar se o CPF já existe
    const { data: existingUser, error: checkError } = await supabase
      .from("pre_cadastros")
      .select("id")
      .eq("cpf", validatedData.cpf)
      .maybeSingle()

    if (checkError) {
      throw new Error(checkError.message)
    }

    if (existingUser) {
      return { success: false, error: "unique constraint violation" }
    }

    // Inserir dados na tabela pre_cadastros
    const { data, error } = await supabase
      .from("pre_cadastros")
      .insert({
        nome: validatedData.nome,
        sobrenome: validatedData.sobrenome,
        cpf: validatedData.cpf,
        data_nascimento: formattedDate,
        numero_processo: validatedData.numeroProcesso || null,
        descricao: validatedData.descricao,
        area: validatedData.area,
        status: StatusPreCadastro.Novo,
      })
      .select()

    if (error) {
      throw new Error(error.message)
    }

    // Criar usuário no Supabase (opcional, dependendo dos requisitos)
    // Isso pode ser feito aqui ou através de um trigger no banco de dados

    // Revalidar a página para atualizar os dados
    revalidatePath("/contact")

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
