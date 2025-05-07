"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { PreCadastro } from "@/types"
import { StatusPreCadastro, statusCores } from "@/types/enums"

interface PreCadastrosTableProps {
  preCadastros: PreCadastro[]
}

export function PreCadastrosTable({ preCadastros }: PreCadastrosTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtrar os pré-cadastros
  const filteredPreCadastros = preCadastros.filter((preCadastro) => {
    const matchesSearch =
      preCadastro.cpf.includes(searchTerm) ||
      (preCadastro.numero_processo && preCadastro.numero_processo.includes(searchTerm))

    const matchesStatus = statusFilter ? preCadastro.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // Paginar os resultados
  const totalPages = Math.ceil(filteredPreCadastros.length / itemsPerPage)
  const paginatedPreCadastros = filteredPreCadastros.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Função para navegar para a página de detalhes
  const handleRowClick = (id: string) => {
    router.push(`/admin/pre-cadastros/${id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-1/3">
          <Input
            placeholder="Search by CPF or case number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {Object.values(StatusPreCadastro).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPreCadastros.length > 0 ? (
              paginatedPreCadastros.map((preCadastro) => (
                <TableRow
                  key={preCadastro.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(preCadastro.id)}
                >
                  <TableCell className="font-medium">
                    {preCadastro.nome} {preCadastro.sobrenome}
                  </TableCell>
                  <TableCell>{preCadastro.cpf}</TableCell>
                  <TableCell>{preCadastro.area}</TableCell>
                  <TableCell>
                    <Badge className={statusCores[preCadastro.status as StatusPreCadastro] || "bg-gray-500"}>
                      {preCadastro.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(preCadastro.created_at), "PPP", { locale: ptBR })}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No pre-registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-900 dark:text-white"
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-gray-900 dark:text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
