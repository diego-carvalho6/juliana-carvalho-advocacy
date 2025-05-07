import { z } from "zod"
import { AreaAtuacao } from "@/types/enums"

// Função para validar CPF
function validarCPF(cpf: string) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, "")

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validação do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = soma % 11
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

  if (digitoVerificador1 !== Number.parseInt(cpf.charAt(9))) return false

  // Validação do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = soma % 11
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto

  return digitoVerificador2 === Number.parseInt(cpf.charAt(10))
}

export const contactFormSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  sobrenome: z.string().min(2, {
    message: "O sobrenome deve ter pelo menos 2 caracteres.",
  }),
  cpf: z
    .string()
    .min(11, { message: "CPF inválido" })
    .refine((cpf) => validarCPF(cpf), {
      message: "CPF inválido",
    }),
  dataNascimento: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  numeroProcesso: z.string().optional(),
  descricao: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  area: z.nativeEnum(AreaAtuacao, {
    required_error: "Por favor, selecione uma área de atuação.",
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
