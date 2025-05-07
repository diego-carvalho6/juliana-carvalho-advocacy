"use client"

import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { formatDate } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"

interface Case {
  id: string
  case_number: string
  client_name: string
  status: string
  date: string
}

const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "case_number",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Número do Processo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "client_name",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${
              status === "Em andamento"
                ? "bg-yellow-500"
                : status === "Concluído"
                  ? "bg-green-500"
                  : status === "Arquivado"
                    ? "bg-gray-500"
                    : "bg-blue-500"
            }`}
          />
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const caseId = row.original.id

      return (
        <div className="flex items-center justify-end">
          <Link href={`/cases/${caseId}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ver detalhes</span>
            </Button>
          </Link>
        </div>
      )
    },
  },
]

export default async function CasesPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Buscar processos do usuário
  const { data: cases } = await supabase
    .from("cases")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meus Processos</h1>
        <Link href="/cases/new">
          <Button>Novo Processo</Button>
        </Link>
      </div>

      <DataTable columns={columns} data={cases || []} searchKey="client_name" />
    </div>
  )
}
