"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface CaseFormProps {
  userId: string
  caseData?: {
    id: string
    case_number: string
    client_name: string
    status: string
    description: string
    date: string
  }
}

export function CaseForm({ userId, caseData }: CaseFormProps) {
  const [caseNumber, setCaseNumber] = useState(caseData?.case_number || "")
  const [clientName, setClientName] = useState(caseData?.client_name || "")
  const [status, setStatus] = useState(caseData?.status || "Em andamento")
  const [description, setDescription] = useState(caseData?.description || "")
  const [date, setDate] = useState(caseData?.date || new Date().toISOString().split("T")[0])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (caseData) {
        // Atualizar processo existente
        const { error } = await supabase
          .from("cases")
          .update({
            case_number: caseNumber,
            client_name: clientName,
            status,
            description,
            date,
          })
          .eq("id", caseData.id)
          .eq("user_id", userId)

        if (error) throw error

        toast({
          title: "Processo atualizado com sucesso!",
        })

        router.push(`/cases/${caseData.id}`)
      } else {
        // Criar novo processo
        const { data, error } = await supabase
          .from("cases")
          .insert({
            case_number: caseNumber,
            client_name: clientName,
            status,
            description,
            date,
            user_id: userId,
          })
          .select()

        if (error) throw error

        toast({
          title: "Processo criado com sucesso!",
        })

        router.push(`/cases/${data[0].id}`)
      }
    } catch (error: any) {
      toast({
        title: "Erro ao salvar processo",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="case_number">Número do Processo</Label>
          <Input id="case_number" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_name">Nome do Cliente</Label>
          <Input id="client_name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : caseData ? "Atualizar Processo" : "Cadastrar Processo"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
