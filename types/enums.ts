export enum AreaAtuacao {
  Civil = "Civil",
  Previdenciario = "Previdenciário",
  Familia = "Família",
}

export enum StatusPreCadastro {
  Novo = "Novo",
  EmAnalise = "Em análise",
  Contatado = "Contatado",
  Finalizado = "Finalizado",
}

export const areaDescricoes = {
  [AreaAtuacao.Civil]: "Questões como contratos, cobranças, responsabilidade civil, danos materiais e morais.",
  [AreaAtuacao.Previdenciario]: "Aposentadorias, benefícios do INSS, revisões e pensões.",
  [AreaAtuacao.Familia]: "Divórcios, guarda de filhos, pensão alimentícia, adoção.",
}

export const statusCores = {
  [StatusPreCadastro.Novo]: "bg-blue-500",
  [StatusPreCadastro.EmAnalise]: "bg-yellow-500",
  [StatusPreCadastro.Contatado]: "bg-purple-500",
  [StatusPreCadastro.Finalizado]: "bg-green-500",
}
