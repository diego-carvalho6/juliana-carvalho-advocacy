export interface Article {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
}

export interface Case {
  id: string
  case_number: string
  client_name: string
  status: string
  description: string
  date: string
  user_id: string
}

export interface User {
  id: string
  email: string
  role?: string
}

export interface PreCadastro {
  id: string
  nome: string
  sobrenome: string
  cpf: string
  data_nascimento: string
  numero_processo?: string
  descricao?: string
  area: string
  status: string
  created_at: string
}
